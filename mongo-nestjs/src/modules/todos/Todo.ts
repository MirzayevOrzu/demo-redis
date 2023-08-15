import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Todo {
  @Prop({
    type: String,
    required: true,
  })
  text: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_done: boolean;
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
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'List',
    required: true,
  })
  list: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
