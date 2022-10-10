import { IsString, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class taskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class updateTaskDto {
  @IsNotEmpty()
  @IsString()
  status: TaskStatus;

  @IsNotEmpty()
  id: string;
}
