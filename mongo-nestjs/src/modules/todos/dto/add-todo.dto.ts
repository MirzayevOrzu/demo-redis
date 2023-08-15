import { IsMongoId, IsString } from 'class-validator';

export class AddTodoDto {
  @IsString()
  text: string;

  @IsMongoId()
  list: string;

  // req.user dan olinadi
  user: string;
}
