import { PartialType } from '@nestjs/mapped-types';
import { AddListDto } from './add-list.dto';

export class EditListDto extends PartialType(AddListDto) {}
