import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
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


  @Get('facts')
  getFacts() {
    return this.usersService.getUserFacts();
  }

  @Post(':id/answer')
  @HttpCode(HttpStatus.CREATED)
  createAnswer(
    @Param('id') id: string,
    @Body() createProfileDto: CreateAnswerDto,
  ): Promise<UserQuestion> {
    return this.usersService.createAnswer(id, createProfileDto);
  }

  @Post(':id/finalize')
  @HttpCode(HttpStatus.CREATED)
  async finalize(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    this.usersService.generateUserSummary(user);
    return { success: true };
  }

  @Get(':id/question')
  async getNextQuestion(@Param('id') id: string): Promise<object> {
    return { data: await this.usersService.getNextQuestion(id) };
  }

  @Get('search')
  async magicSearch(@Query('question') question: string): Promise<object> {
    return { data: await this.usersService.magicSearch(question) };
  }

  @Get(':id/bio')
  async getBio(@Param('id') id: string): Promise<object> {
    return { data: await this.usersService.getBio(id) };
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
  ): Promise<User | null> {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.softDelete(id);
  }

}
