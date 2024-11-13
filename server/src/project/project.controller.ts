import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadInterceptor } from 'src/interceptors/upload.interceptor';

@ApiTags('project APIs')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiResponse({
    status: 201,
    description:
      'this is for instructor to create a project and return an success message',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @Post('instructor/createProject')
  async createNewProject(
    @Req() Request: Request,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const project_img = Request['fileUrl'];
    const instructorID = Request['user'].user_id;
    return await this.projectService.createNewProject(
      createProjectDto,
      project_img,
      instructorID,
    );
  }

  @ApiResponse({
    status: 201,
    description:
      'this is for instructor to update the project and return an success message',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor, Role.Admin)
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @Put('instructor/update/:id')
  async UpdateProject(
    @Req() Request: Request,
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('id') projectID: string,
  ) {
    const project_img = Request['fileUrl'];
    return await this.projectService.UpdateProject(
      updateProjectDto,
      project_img,
      projectID,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Get all instructor projects with optional search',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor, Role.Admin)
  @Get('instructorProjects')
  async getInstructorProjects(
    @Req() Request: Request,
    @Query('project_name') projectName?: string,
  ) {
    const instructorID = Request['user'].user_id;
    return await this.projectService.getInstructorProjects(
      instructorID,
      projectName,
    );
  }

  @ApiResponse({
    status: 200,
    description:
      'this is will get all details from project to instructor to students model',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Student, Role.Admin, Role.Instructor)
  @Get('projectDetails/:id')
  async getProjectDetails(@Param('id') projectID: string) {
    return await this.projectService.getProjectDetails(projectID);
  }

  @ApiResponse({
    status: 200,
    description: 'just will return the joined projects for the student',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Student)
  @Get('student/enrolledProjects')
  async getProjectStudents(@Req() Request: Request) {
    const StudentID = Request['user'].user_id;
    return await this.projectService.getProjectStudents(StudentID);
  }

  //   @ApiResponse({
  //     status: 200,
  //     description: 'get the students request from the instructor',
  //   })
  //   @UseGuards(AuthGuard, RolesGuard)
  //   @Roles(Role.Instructor)
  //   @Get('instructor/enrolledProjects')
  //   async getStudentsRequests(@Req() Request: Request) {
  //     const StudentID = Request['user'].user_id;
  //     return await this.projectService.getStudentsRequests(StudentID);
  //   }
}
