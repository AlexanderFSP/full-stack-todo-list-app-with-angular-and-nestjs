import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  public create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  public findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const task = await this.tasksService.findOne(id);

    if (task) {
      return task;
    }

    throw new NotFoundException();
  }

  @Patch(':id')
  public update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<UpdateResult> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.tasksService.remove(id);
  }
}
