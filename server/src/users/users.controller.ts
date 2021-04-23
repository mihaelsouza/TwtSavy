import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserDTO } from './utilities/create-user.dto';
import { hash, compare } from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor ( private usersService: UsersService ) {}

  @Post()
    async getUser(@Body() {email, password}: {email: string, password: string}): Promise<UserDTO | string> {
      const user: UserDTO | null = await this.usersService.findUser(email);

      if (user) {
        const match = await compare(password, user.password);
        delete user.password;
        return match ? user : 'Error: invalid e-mail and/or password.';
      } else return 'Error: e-mail not registered!';
    }

  @Post('add')
    async createUser(@Body() newUser: UserDTO): Promise<UserDTO | string> {
      newUser.password = await hash(newUser.password, 10);
      const user: UserDTO | null = await this.usersService.findUser(newUser.email);
      return user ? 'This email address is already in use.' : await this.usersService.createUser(newUser);
    }
};