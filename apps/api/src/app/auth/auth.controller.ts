import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  public async signup(@Body() { username, password }: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOne({ username });

    if (user) {
      throw new BadRequestException('Username already exists');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return this.usersService.create({ username, password: hashedPassword });
  }
}
