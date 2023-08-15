import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './Todo';
import { Model } from 'mongoose';
import { List } from '../lists/List';
import { ListTodosDto } from './dto/list-todos.dto';
import { ShowTodoDto } from './dto/show-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(List.name) private listModel: Model<List>,
  ) {}

  async add({ list, user, ...rest }: AddTodoDto) {
    const existingList = await this.listModel.findOne({ _id: list, user });

    if (!existingList) {
      throw new NotFoundException('List topilmadi.');
    }

    const result = await this.todoModel.create({ list, user, ...rest });

    existingList.todos.push(result.id);
    existingList.save();

    return result;
  }

  async list({ filters = {} }: ListTodosDto) {
    const lists = await this.todoModel.find({ ...filters, is_deleted: false });

    return lists;
  }

  async show({ id, user }: ShowTodoDto) {
    const todo = await this.todoModel
      .findOne({
        _id: id,
        is_deleted: false,
        user,
      })
      .populate('list');

    if (!todo) {
      throw new NotFoundException('Todo topilmadi.');
    }

    return todo;
  }

  async edit({ id, user }: ShowTodoDto, dto: EditTodoDto) {
    const existing = await this.todoModel.findOne({
      _id: id,
      is_deleted: false,
      user,
    });

    if (!existing) {
      throw new NotFoundException('Todo topilmadi.');
    }

    if (dto.list) {
      const existingList = await this.listModel.findOne({
        _id: dto.list,
        user,
      });

      if (!existingList) {
        throw new NotFoundException('List topilmadi.');
      }
    }

    return this.todoModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove({ id, user }: ShowTodoDto) {
    const existing = await this.todoModel.findOne({
      _id: id,
      is_deleted: false,
      user,
    });

    if (!existing) {
      throw new NotFoundException('Todo topilmadi.');
    }

    return this.todoModel.findByIdAndUpdate(id, { is_deleted: true });
  }
}
