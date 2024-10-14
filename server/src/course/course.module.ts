import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtServiceModule } from 'src/auth/jwt-service/jwt-service.module';
import { UploadModule } from 'src/upload/upload.module';
import { modelsProviders } from 'src/providers/models.providers';

@Module({
  imports: [DatabaseModule, JwtServiceModule, UploadModule],
  controllers: [CourseController],
  providers: [CourseService, ...modelsProviders],
})
export class CourseModule {}
