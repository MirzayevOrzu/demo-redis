import { IsString } from 'class-validator';

export class AddListDto {
  @IsString()
  name: string;

  // Buni req.userdan olib qo'shib qo'yamiz
  user: string;
}
