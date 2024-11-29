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

  @ApiProperty({
    description: 'Date when the report is submitted',
    type: String,
    format: 'date-time',
    example: '2024-11-28T12:00:00Z',
  })
  @IsDateString({}, { message: 'Report date must be a valid ISO 8601 string' })
  report_at: Date;
}
