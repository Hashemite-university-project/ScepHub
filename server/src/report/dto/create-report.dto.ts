import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'Message describing the report',
    type: String,
    example: 'This is a report message',
  })
  @IsString()
  @IsNotEmpty({ message: 'Report message is required' })
  report_message: string;
}
