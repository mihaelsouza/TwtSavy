import { ClientPayload, ClientPayloadDummy } from '../../analyze/utilities/client.payload.interface';
import { User, UserDocument } from '../utilities/user.schema';
import { UserDTO } from '../utilities/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(userData: UserDTO): Promise<User> {
    const newUser: UserDocument = new this.userModel(userData);
    return await newUser.save();
  }

  async findUser(property: string): Promise<User> {
    return await this.userModel.findOne({ email: property });
  }

  async saveSearch(id: number, query: string, search: ClientPayload): Promise<void> {
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

  async retrieveSearch(id: number, query: string): Promise<ClientPayload> {
    try {
      const document = await this.userModel.findOne({ _id: id, 'searches.query': query});
      return document.searches.filter(item => item.query === query)[0].data;
    } catch (err) {
      return ClientPayloadDummy;
    }
  }
};