import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadInterceptor } from 'src/interceptors/upload.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

@ApiTags('Report APIs')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @Post('create')
  async createReport(
    @Body() createReportDto: CreateReportDto,
    @Req() Request: Request,
  ) {
    const report_img = Request['fileUrl'];
    const userID = Request['user'].user_id;
    return await this.reportService.createReport(
      createReportDto,
      report_img,
      userID,
    );
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }
}
