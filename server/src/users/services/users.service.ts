import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from '../utilities/create-user.dto';
import { User, UserDocument } from '../utilities/user.schema';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(userData: UserDTO): Promise<User> {
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async findUser(property: string): Promise<User> {
    return await this.userModel.findOne({ email: property });
  }
};