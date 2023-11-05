import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EntityCondition} from 'src/utils/types/entity-condition.type';
import {DeepPartial, Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './entities/user.entity';
import {NullableType} from '../utils/types/nullable.type';
import {CreateAnswerDto} from './dto/create-answer.dto';
import {UserQuestion} from './entities/user-question.entity';
import {OpenaiService} from '../openai/openai.service';
import {getRandomHobbies, getRandomPosition} from '../utils/mock.helper';

const _ = require('lodash');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserQuestion)
    private userQuestionsRepo: Repository<UserQuestion>,
    private readonly openaiService: OpenaiService,
  ) {
    // this.mockUser()
    // this.generateSummary()
    // this.magicSearch('I want to play a chess.');
    // this.generateAllSummaries()
  }

  async mockUser() {
    const famousPeople = [];

    for (const person of famousPeople) {
      console.log(person);
      await this.simulateUser(person, 15);
    }
  }

  async simulateUser(name: string, questionsCount = 10) {
    let user = await this.create({ name });
    const hobbies = getRandomHobbies();
    const position = getRandomPosition();
    user = (await this.update(user.id, { hobbies, position }))!;
    await user.reload();
    for (let i = 0; i < questionsCount; i++) {
      console.log(i + 1);
      const question = await this.getNextQuestion(user.id);
      console.log(question);
      const answer = await this.openaiService.generateMockAnswer(
        question,
        name,
      );
      console.log(answer);
      await this.createAnswer(user.id, { question, answer });
      console.log('saved');
    }
  }

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  async createAnswer(
    userId: string,
    createAnswerDto: CreateAnswerDto,
  ): Promise<UserQuestion> {
    const answer = await this.userQuestionsRepo.save(
      this.userQuestionsRepo.create({ ...createAnswerDto, userId }),
    );
    this.generateQuestionSummary(answer);
    return answer;
  }

  async generateAllQuestionSummaries() {
    const questions = await this.userQuestionsRepo.find({});

    for (const question of questions) {
      await this.generateQuestionSummary(question);
    }
  }

  async generateAllSummaries() {
    const users = await this.usersRepository.find({});

    for (const user of users) {
      await this.getBio(user.id)
    }
  }

  async generateUserSummary(user: User) {
    const summary = await this.openaiService.createUserSummary(user);
    await this.usersRepository.update({id: user.id}, {summary: summary})
  }

  async getUserFacts() {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder
        .select(['user.fact', 'user.name'])
        .where("user.fact IS NOT NULL");

    const result = await queryBuilder.getMany();
    return result;  }


  async generateUserFact(user: User) {
    if (!user.bio) {
      return
    }

    if (!!user.fact) {
      return
    }

    const fact = await this.openaiService.createUserFact(user);
    await this.usersRepository.update({id: user.id}, {fact})
  }

  async generateQuestionSummary(answer: UserQuestion) {
    const summary = await this.openaiService.createQuestionSummary(answer);
    await this.userQuestionsRepo.update({id: answer.id}, {summary: summary})
  }

  async magicSearch(question) {
    const users = await this.usersRepository.find();
    const response: any[] = [];

    const chunks = _.chunk(users, 5);
    for (const chunk of chunks) {
      const chunkResponse = await this.openaiService.magicSearch(
        question,
        chunk,
      );
      response.push(...chunkResponse.users);
    }
    return { users: response };
  }

  async getNextQuestion(userId: string): Promise<string> {
    const user = await this.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    return this.openaiService.generateNextQuestion(user);
  }

  async getBio(userId: string): Promise<string> {
    const user = await this.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    let bio = user.bio;

    if (!bio) {
      bio = await this.openaiService.getBio(user);
      await this.usersRepository.update({id: user.id}, {bio: bio})
      await user.reload()
      this.generateUserFact(user)
    }

    return bio;
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  async update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null> {
    await this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );

    return this.findOne({ id });
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
