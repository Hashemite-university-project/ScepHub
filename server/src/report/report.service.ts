import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Reports } from 'src/database/entities/report.entity';
import { Users } from 'src/database/entities/user.entity';

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
        report_img: report_img,
      });
      return { message: 'Report saved successfully!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllReports() {
    try {
      const allReports = await this.reportModel.findAll({
        include: [
          {
            model: Users,
          },
        ],
      });
      return allReports;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
