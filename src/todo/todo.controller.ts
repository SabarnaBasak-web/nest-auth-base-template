import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards';
import { GetUser } from 'src/auth/decorators';
import { CreateTodo, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getAllTodos(@GetUser('id', ParseIntPipe) userId: number) {
    return this.todoService.getAllTodos(userId);
  }

  @Get(':id')
  getTodoById(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.getTodoById(userId, todoId);
  }
  @Post()
  createTodo(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() dto: CreateTodo,
  ) {
    return this.todoService.createTodo(userId, dto);
  }

  @Put(':id')
  updateTodo(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateTodoDto,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.updateTodo(userId, todoId, dto);
  }

  @Delete(':id')
  deleteTodo(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.deleteTodo(userId, todoId);
  }
}
