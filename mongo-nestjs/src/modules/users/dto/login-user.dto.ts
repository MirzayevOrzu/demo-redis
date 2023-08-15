import { PickType } from '@nestjs/mapped-types';
import { AddUserDto } from './add-user.dto';

export class LoginUserDto extends PickType(AddUserDto, [
  'username',
  'password',
] as const) {}
