import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodo {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  description?: string;
}
