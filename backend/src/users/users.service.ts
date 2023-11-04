import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UserQuestion } from './entities/user-question.entity';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserQuestion)
    private userQuestionsRepo: Repository<UserQuestion>,
    private readonly openaiService: OpenaiService,
  ) {}

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  createAnswer(
    userId: string,
    createAnswerDto: CreateAnswerDto,
  ): Promise<UserQuestion> {
    return this.userQuestionsRepo.save(
      this.userQuestionsRepo.create({ ...createAnswerDto, userId }),
    );
  }

  async getNextQuestion(userId: string): Promise<string> {
    const user = await this.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    return this.openaiService.generateNextQuestion(user);
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
