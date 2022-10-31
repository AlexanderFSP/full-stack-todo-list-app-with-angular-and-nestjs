import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {}

  public create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, user });

    return this.tasksRepository.save(task);
  }

  public findAll(user: User): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user } });
  }

  public async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<UpdateResult> {
    await this.verifyTaskRelation(id, user);

    return this.tasksRepository.update(id, updateTaskDto);
  }

  public async remove(id: number, user: User): Promise<DeleteResult> {
    await this.verifyTaskRelation(id, user);

    return this.tasksRepository.delete(id);
  }

  private findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id }, relations: { user: true } });
  }

  private async verifyTaskRelation(id: number, user: User): Promise<void> {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    if (task.user.id !== user.id) {
      throw new ForbiddenException();
    }
  }
}
