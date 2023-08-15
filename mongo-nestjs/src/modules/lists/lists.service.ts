import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddListDto } from './dto/add-list.dto';
import { EditListDto } from './dto/edit-list.dto';
import { List } from './List';
import { ListListsDto } from './dto/list-lists.dto';
import { ShowListDto } from './dto/show-list.dto';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  async add(dto: AddListDto) {
    const result = await this.listModel.create(dto);

    return result;
  }

  async list({ filters = {} }: ListListsDto) {
    const lists = await this.listModel.find({ ...filters, is_deleted: false });

    return lists;
  }

  async show({ id, user }: ShowListDto) {
    const list = await this.listModel
      .findOne({ _id: id, is_deleted: false, user })
      .populate('todos');

    if (!list) {
      throw new NotFoundException('List topilmadi.');
    }

    return list;
  }

  async edit({ id, user }: ShowListDto, dto: EditListDto) {
    const existing = await this.listModel.findOne({
      _id: id,
      is_deleted: false,
      user,
    });

    if (!existing) {
      throw new NotFoundException('List topilmadi.');
    }

    return this.listModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove({ id, user }: ShowListDto) {
    const existing = await this.listModel.findOne({
      _id: id,
      is_deleted: false,
      user,
    });

    if (!existing) {
      throw new NotFoundException('List topilmadi.');
    }

    return this.listModel.findByIdAndUpdate(id, { is_deleted: true });
  }
}
