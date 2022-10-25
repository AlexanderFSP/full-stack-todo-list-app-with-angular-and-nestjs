import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>
  ) {}

  public create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);

    return this.tasksRepository.save(task);
  }

  public findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  public findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  public update(
    id: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<UpdateResult> {
    // TODO: save ?
    return this.tasksRepository.update(id, updateTaskDto);
  }

  public remove(id: number): Promise<DeleteResult> {
    // TODO: remove ?
    return this.tasksRepository.delete(id);
  }
}
