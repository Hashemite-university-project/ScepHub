import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtServiceModule } from 'src/auth/jwt-service/jwt-service.module';
import { UploadModule } from 'src/upload/upload.module';
import { Jwtservice } from 'src/auth/jwt-service/jwt-service.service';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';
import { modelsProviders } from 'src/providers/models.providers';

@Module({
  imports: [DatabaseModule, JwtServiceModule, UploadModule],
  controllers: [ReportController],
  providers: [ReportService, Jwtservice, BcryptService, ...modelsProviders],
})
export class ReportModule {}
