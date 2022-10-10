import { Body, Controller, Get, Post, Param, Delete, Put, Query } from "@nestjs/common";
import { Task } from "./tasks.model";
import { TasksService } from "./tasks.service";
import { taskDto, updateTaskDto, GetTasksFilterDto } from "./dto";

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('')
  getTasks(@Query() GetTasksFilterDto :GetTasksFilterDto): Task[] {
    // if we have any filter call the service with the filter, else return all tasks
    if (Object.keys(GetTasksFilterDto).length) {
      return this.tasksService.getTasksWithFilters(GetTasksFilterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post('')
  createTask(@Body() dto: taskDto ): Task {
    return this.tasksService.createTask(dto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTaskStatus(@Body() updateTaskDto: updateTaskDto ): Task {
    return this.tasksService.updateTaskStatus(updateTaskDto);
  }


}
