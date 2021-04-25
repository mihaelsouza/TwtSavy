import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserDTO } from './utilities/user-dto';

@Controller('users')
export class UsersController {
  constructor ( private usersService: UsersService ) {}

  @Post()
  @UsePipes(ValidationPipe)
    async getUser(@Body() {email, password}: {email: string, password: string}): Promise<UserDTO> {
      return await this.usersService.validateUser(email, password);
    }

  @Post('add')
    async createUser(@Body() newUser: UserDTO): Promise<UserDTO> {
      return await this.usersService.createUser(newUser);
    }
};