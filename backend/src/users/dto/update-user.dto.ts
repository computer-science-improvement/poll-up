import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  experience: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  position: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hobbies: string;
}
