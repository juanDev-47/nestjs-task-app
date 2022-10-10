import { Injectable } from "@nestjs/common";
import { GetTasksFilterDto, taskDto, updateTaskDto } from "./dto";
import { Task, TaskStatus } from "./tasks.model";
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  // method to get tasks with filters
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  createTask(dto: taskDto): Task {
    const task: Task = {
      id: uuid(),
      title: dto.title,
      description: dto.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);

  }

  updateTaskStatus(updateTaskDto: updateTaskDto ): Task {
    const { id, status } = updateTaskDto;
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }

}
