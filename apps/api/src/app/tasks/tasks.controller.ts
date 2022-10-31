import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  public create(@Req() req: Request, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const user = req.user as User;

    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  public findAll(@Req() req: Request): Promise<Task[]> {
    const user = req.user as User;

    return this.tasksService.findAll(user);
  }

  @Patch(':id')
  public update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<UpdateResult> {
    const user = req.user as User;

    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  public remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    const user = req.user as User;

    return this.tasksService.remove(id, user);
  }
}
