import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AddUserDto } from './dto/add-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from './User';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async add(dto: AddUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const result = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    return result;
  }

  async login({ username, password }: LoginUserDto) {
    const existing = await this.userModel.findOne({
      username,
      is_deleted: false,
    });

    if (!existing) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    const match = await bcrypt.compare(password, existing.password);

    if (!match) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    const token = this.jwtService.sign({ user: { id: existing._id } });

    return { token };
  }

  async show(id: string) {
    const user = await this.userModel.findOne({ _id: id, is_deleted: false });

    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    return user;
  }

  async edit(id: string, dto: EditUserDto) {
    const existing = await this.userModel.findOne({
      _id: id,
      is_deleted: false,
    });

    if (!existing) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    return this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    const existing = await this.userModel.findOne({
      _id: id,
      is_deleted: false,
    });

    if (!existing) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    return this.userModel.findByIdAndUpdate(id, {
      is_deleted: true,
      username: `${existing.username}_${Date.now()}_deleted`,
    });
  }
}
