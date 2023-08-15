import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Todo } from '../todos/Todo';

export type ListDocument = HydratedDocument<List>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class List {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: string;

  @Prop({
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'List',
    default: [],
  })
  todos: string[] | Todo[];
}

export const ListSchema = SchemaFactory.createForClass(List);
