import {IsString,} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  question: string

  @ApiProperty()
  @IsString()
  answer: string
}
