import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }
}
