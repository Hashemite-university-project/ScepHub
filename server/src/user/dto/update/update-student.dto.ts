import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StudentFormDto {
  @ApiProperty({
    description: 'must be an array of string',
    type: ['string'],
    required: false,
    example: '["oop", "javascript", "nest.js", "react"]',
  })
  skills?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Hashemite Unevirsity',
  })
  university_name?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Software Engineer',
  })
  major?: string;

  @IsString({ message: 'must be string' })
  @ApiProperty({
    type: 'string',
    required: false,
    example: 'lorem lorem lorem lorem',
  })
  about_me?: string;
}
