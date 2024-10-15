import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InstructorFormDto {
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
