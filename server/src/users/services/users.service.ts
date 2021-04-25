import { ClientPayloadDTO, ClientPayloadDummy } from '../../analyze/utilities/client.payload.interface';
import { User, UserDocument } from '../utilities/user.schema';
import { UserDTO } from '../utilities/create-user.dto';
import { hash, compare } from 'bcrypt';

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findUser(property: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email: property });
    } catch (err) {
      throw new NotFoundException('User not found.');
    }
  }

  async createUser(userData: UserDTO): Promise<UserDTO> {
    try {
      const user: User = await this.findUser(userData.email);
      if (user) throw new Error();
      else {
        userData.password = await hash(userData.password, 10);
        const newUser: UserDocument = new this.userModel(userData);
        await newUser.save();

        return {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          twitter_handle: newUser.twitter_handle
        }
      }
    } catch (err) {
      throw new ConflictException('This email address is already in use.');
    }
  }

  async validateUser(email: string, password: string): Promise<UserDTO> {
    const user: User = await this.findUser(email);

    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        delete user.password;

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          twitter_handle: user.twitter_handle
        };
      }
      else throw new ConflictException('Error: invalid e-mail and/or password.');
    } else throw new NotFoundException('Error: e-mail not registered!');
  }

  async saveSearch(id: number, query: string, search: ClientPayloadDTO): Promise<void> {
    await this.userModel.updateOne(
      {_id: id},
      {$push: {
        searches: {
          query: query,
          data: search
        }
      }}
    );
  };

  async retrieveSearch(id: number, query: string): Promise<ClientPayloadDTO> {
    try {
      const document = await this.userModel.findOne({ _id: id, 'searches.query': query});
      return document.searches.filter(item => item.query === query)[0].data;
    } catch (err) {
      return ClientPayloadDummy;
    }
  }
};