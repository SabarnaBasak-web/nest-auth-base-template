import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodo, UpdateTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}
  async createTodo(userId: number, createTodoDto: CreateTodo) {
    const result = await this.prismaService.todos.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        userId: userId,
        isDeleted: false,
      },
    });
    return result;
  }

  async getAllTodos(userId: number) {
    return this.prismaService.todos.findMany({
      where: { userId: userId, isDeleted: false },
    });
  }

  async updateTodo(
    userId: number,
    todoId: number,
    updateTodoDto: UpdateTodoDto,
  ) {
    const result = await this.prismaService.todos.findFirst({
      where: { id: todoId, userId: userId, isDeleted: false },
    });

    if (!result) {
      throw new NotFoundException('Please check the id');
    }

    return await this.prismaService.todos.update({
      data: {
        title: updateTodoDto.title,
        description: updateTodoDto.description,
      },
      where: {
        userId: userId,
        id: todoId,
      },
    });
  }

  async getTodoById(userId: number, todoId: number) {
    const result = await this.prismaService.todos.findFirst({
      where: { id: todoId, userId: userId, isDeleted: false },
    });

    if (!result) {
      throw new NotFoundException('Please check the id');
    }
    return result;
  }

  async deleteTodo(userId: number, todoId: number) {
    const result = await this.prismaService.todos.findFirst({
      where: { id: todoId, userId: userId, isDeleted: false },
    });
    if (!result) {
      throw new NotFoundException('Please check the id');
    }

    return await this.prismaService.todos.update({
      data: {
        isDeleted: true,
      },
      where: {
        id: todoId,
        userId: userId,
      },
    });
  }
}
