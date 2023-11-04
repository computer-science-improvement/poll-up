import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UserQuestion } from './entities/user-question.entity';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createProfileDto);
  }

  @Post(':id/answer')
  @HttpCode(HttpStatus.CREATED)
  createAnswer(
    @Param('id') id: string,
    @Body() createProfileDto: CreateAnswerDto,
  ): Promise<UserQuestion> {
    return this.usersService.createAnswer(id, createProfileDto);
  }

  @Get(':id/question')
  @HttpCode(HttpStatus.CREATED)
  getNextQuestion(@Param('id') id: string): Promise<string> {
    return this.usersService.getNextQuestion(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersService.findOne({ id: id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
