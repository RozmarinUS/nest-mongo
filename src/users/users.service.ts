import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.find();
  }

  async create(createUserDto: createUserDto): Promise<boolean> {
    if (!createUserDto.login && !createUserDto.password)
      throw new BadRequestException('No login or password specified');

    if (await this.findOne({ login: createUserDto.login }))
      throw new ConflictException('User already exists in the database');

    await new this.usersModel({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
    return true;
  }

  async loginUser(_id: string, loginUserDto: loginUserDto) {
    console.log(loginUserDto);
    await this.usersModel.updateOne({ _id }, loginUserDto);
  }

  async update(_id: string, updateUserDto: updateUserDto): Promise<boolean> {
    if (await this.findOne({ login: updateUserDto.login }))
      throw new ConflictException('User already exists in the database');

    await this.usersModel.updateOne({ _id }, updateUserDto);
    return true;
  }

  async delete(_id: string) {
    const user = this.usersModel.findOne({ _id });
    if (user) {
      return user.remove();
    } else {
      throw new NotFoundException();
    }
  }

  async findOne(data): Promise<Users> {
    return this.usersModel.findOne(data);
  }
}
