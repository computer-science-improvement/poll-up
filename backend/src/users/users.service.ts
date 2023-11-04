import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EntityCondition} from 'src/utils/types/entity-condition.type';
import {DeepPartial, Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './entities/user.entity';
import {NullableType} from '../utils/types/nullable.type';
import {CreateAnswerDto} from "./dto/create-answer.dto";
import {UserQuestion} from "./entities/user-question.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserQuestion)
    private userQuestionsRepo: Repository<UserQuestion>,
  ) {}

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  createAnswer(userId: string, createAnswerDto: CreateAnswerDto): Promise<UserQuestion> {
    return this.userQuestionsRepo.save(
      this.userQuestionsRepo.create({...createAnswerDto, userId}),
    );
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
