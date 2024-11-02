import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadInterceptor } from 'src/interceptors/upload.interceptor';
import { CreateContentDto } from './dto/create-content.dto';

@ApiTags('Course APIs')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiResponse({ status: 200, description: 'created successfully!' })
  @UseGuards(AuthGuard)
  @Get('allCourses')
  async getAllCourses() {
    const allCourses = await this.courseService.getAllCourses();
    return allCourses;
  }

  @ApiResponse({ status: 200, description: 'created successfully!' })
  @UseGuards(AuthGuard)
  @Get('courseDetails/:id')
  async getCourseDetails(
    @Param('id') course_id: string,
    @Req() Request: Request,
  ) {
    const studentID = Request['user'].user_id;
    const role = Request['user'].role;
    const allCourses = await this.courseService.getCourseDetails(
      course_id,
      studentID,
      role,
    );
    return allCourses;
  }

  @ApiResponse({ status: 201, description: 'created successfully!' })
  @ApiResponse({ status: 403, description: 'Invalid data provided' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @Post()
  async createNewCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Req() Request: Request,
  ) {
    try {
      const course_img = Request['fileUrl'];
      const instructorID = Request['user'].user_id;
      const result = await this.courseService.createNewCourse(
        createCourseDto,
        course_img,
        instructorID,
      );
      return {
        status: 'success',
        message: 'Course created successfully!',
        data: result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'search function or admin dashboard',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @Get('instructorCourses')
  findAllInstructorCourse(@Req() Request: Request) {
    const instructorID = Request['user'].user_id;
    return this.courseService.findAllInstructorCourse(instructorID);
  }

  @ApiResponse({ status: 201 })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @Put('update/:id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() Request: Request,
  ) {
    const course_img = Request['fileUrl'];
    return this.courseService.updateCourse(id, updateCourseDto, course_img);
  }

  // @ApiResponse({ status: 200 })
  // @Get(':id')
  // findOneCourse(@Param('id') id: string) {
  //   return this.courseService.findOneCourse(id);
  // }

  @ApiResponse({ status: 201 })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor, Role.Admin)
  @Put('delete/:id')
  removeCourse(@Param('id') id: string) {
    return this.courseService.removeCourse(id);
  }

  @ApiResponse({ status: 201, description: 'created successfully!' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @Post('content')
  createCourseContent(
    @Body() createContentDto: CreateContentDto,
    @Param('id') id: string,
  ) {
    const instructorID = Request['user'].user_id;
    const course_vid = Request['fileUrl'];
    return this.courseService.createCourseContent(
      createContentDto,
      id,
      course_vid,
      instructorID,
    );
  }
}
