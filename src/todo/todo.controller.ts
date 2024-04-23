import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  @Get()
  getAllTodos() {
    return 'all todos!!';
  }
}
