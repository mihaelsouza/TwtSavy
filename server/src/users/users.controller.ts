import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserDTO } from './utilities/create-user.dto';

@Controller('users')
export class UsersController {
  constructor ( private usersService: UsersService ) {}

  @Get(':email')
    async getUser(@Param('email') email: string): Promise<UserDTO | string> {
      const user: UserDTO | null = await this.usersService.findUser(email);
      return user ? user : 'No user with that email address.';
    }

  @Post()
    async createUser(@Body() newUser: UserDTO): Promise<UserDTO | string> {
      const user: UserDTO | null = await this.usersService.findUser(newUser.email);
      return user ? 'This email address is already in use.' : await this.usersService.createUser(newUser);
    }
};