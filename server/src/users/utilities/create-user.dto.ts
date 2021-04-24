// export interface UserDTO {
//   name: string,
//   email: string,
//   username: string,
//   password: string,
//   twitter_handle?: string
// };

import { IsNotEmpty, IsString, IsEmail, IsOptional, IsMongoId } from 'class-validator';

export class UserDTO {
  @IsOptional()
  @IsMongoId()
  _id?: string;

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

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  twitter_handle?: string;
};