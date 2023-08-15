import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AppUser } from 'src/shared/types/app-user';
import { TodosService } from './todos.service';
import { AddTodoDto } from './dto/add-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';

@UseGuards(IsLoggedIn)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  postTodo(@Body() dto: AddTodoDto, @CurrentUser() user: AppUser) {
    return this.todosService.add({ ...dto, user: user.id });
  }

  @Get()
  getTodos(@CurrentUser() user: AppUser) {
    return this.todosService.list({ filters: { user: user.id } });
  }

  @Get(':id')
  getTodo(@Param('id') id: string, @CurrentUser() user: AppUser) {
    return this.todosService.show({ id, user: user.id });
  }

  @Patch(':id')
  patchTodo(
    @Param('id') id: string,
    @CurrentUser() user: AppUser,
    @Body() dto: EditTodoDto,
  ) {
    return this.todosService.edit({ id, user: user.id }, dto);
  }

  @Delete()
  deleteTodo(@Param('id') id: string, @CurrentUser() user: AppUser) {
    return this.todosService.remove({ id, user: user.id });
  }
}
