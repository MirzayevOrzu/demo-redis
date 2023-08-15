import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AppUser } from 'src/shared/types/app-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  postRegisterUser(@Body() dto: AddUserDto) {
    return this.usersService.add(dto);
  }

  @Post('login')
  postLoginUser(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @UseGuards(IsLoggedIn)
  @Get('me')
  getMe(@CurrentUser() user: AppUser) {
    return this.usersService.show(user.id);
  }

  @UseGuards(IsLoggedIn)
  @Patch('me')
  patchMe(@CurrentUser() user: AppUser, @Body() dto: EditUserDto) {
    return this.usersService.edit(user.id, dto);
  }

  @UseGuards(IsLoggedIn)
  @Delete('me')
  deleteMe(@CurrentUser() user: AppUser) {
    return this.usersService.remove(user.id);
  }
}
