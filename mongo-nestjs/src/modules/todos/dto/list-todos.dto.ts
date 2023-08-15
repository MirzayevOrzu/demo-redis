import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, ValidateNested } from 'class-validator';

export class ListTodosDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TodoFiltersDto)
  filters?: TodoFiltersDto;
}

class TodoFiltersDto {
  @IsOptional()
  @IsMongoId()
  user?: string;
}
