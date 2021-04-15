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
};