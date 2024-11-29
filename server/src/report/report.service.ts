import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Reports } from 'src/database/entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @Inject('REPORTS')
    private readonly reportModel: typeof Reports,
  ) {}

  async createReport(
    createReportDto: CreateReportDto,
    report_img: string,
    userID: string,
  ) {
    try {
      await this.reportModel.create({
        report_message: createReportDto.report_message,
        report_user: userID,
        report_at: createReportDto.report_at,
        report_img: report_img,
      });
      return { message: 'Report saved successfully!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }
}
