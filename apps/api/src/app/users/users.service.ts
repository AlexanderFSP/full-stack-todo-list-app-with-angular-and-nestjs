import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  public update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    // TODO: save ?
    return this.usersRepository.update(id, updateUserDto);
  }

  public remove(id: string): Promise<DeleteResult> {
    // TODO: remove ?
    return this.usersRepository.delete(id);
  }
}
