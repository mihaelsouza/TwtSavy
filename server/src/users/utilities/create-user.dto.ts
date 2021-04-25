import { IsNotEmpty, IsString, IsEmail, IsOptional, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserDTO {
  @IsOptional()
  @IsMongoId()
  _id?: ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  twitter_handle: string;
};