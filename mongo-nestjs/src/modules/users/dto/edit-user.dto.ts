import { OmitType, PartialType } from '@nestjs/mapped-types';
import { AddUserDto } from './add-user.dto';

export class EditUserDto extends PartialType(
  OmitType(AddUserDto, ['password'] as const),
) {}
