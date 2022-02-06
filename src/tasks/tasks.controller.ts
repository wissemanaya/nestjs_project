import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')   //  to create a basic controller, we use classes and decorators
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks( @Query() filterDto: GetTasksFilterDto): Task[] {
    //if we have any filterrs  defined call tasksService.getTasksWithFilters
    if (Object.keys(filterDto).length) {         // if one of status or search defined
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks() ;
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {      //@parm() handler that get the value passed in 
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {    //@parm() handler that contain the param defined in body of createTaskDto
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
