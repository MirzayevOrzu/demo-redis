import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, ValidateNested } from 'class-validator';

export class ListListsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ListFiltersDto)
  filters?: ListFiltersDto;
}

class ListFiltersDto {
  @IsOptional()
  @IsMongoId()
  user?: string;
}
