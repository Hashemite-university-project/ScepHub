import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseInterceptors,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, request, Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { StudentFormDto } from './dto/update/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadInterceptor } from 'src/interceptors/upload.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { InstructorFormDto } from './dto/update/update-Instructor.dto';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateAdminDto } from './dto/create/create-admin.dto';

@ApiTags('Users APIs')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, description: 'must return access token' })
  @ApiResponse({ status: 403, description: 'Already exists' })
  @Post('student/signUp')
  async StudentSignUp(
    @Body() createStudentDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const newStudent = await this.userService.StudentSignUp(createStudentDto);
      response.cookie('access_token', newStudent.access_token);
      response.cookie('refresh_token', newStudent.refreshToken);
      response.status(HttpStatus.CREATED).json({
        access_token: newStudent.access_token,
        refresh_token: newStudent.refreshToken,
        role: newStudent.role,
      });
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.CONFLICT)
        .json({ message: 'The Email or Phone number is already exist!' });
    }
  }

  @ApiResponse({ status: 201, description: 'must return access token' })
  @ApiResponse({ status: 401, description: 'incorrect password' })
  @Post('instructor/signUp')
  async instructorSignUp(
    @Body() createInstructorDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const newInstructor =
        await this.userService.instructorSignUp(createInstructorDto);
      response.cookie('access_token', newInstructor.token);
      response.cookie('refresh_token', newInstructor.refreshToken);
      response.status(HttpStatus.CREATED).json({
        access_token: newInstructor.token,
        refresh_token: newInstructor.refreshToken,
        role: newInstructor.role,
      });
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.CONFLICT)
        .json({ message: 'The Email or Phone number is already exist!' });
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Must return access and refresh token',
  })
  @ApiResponse({ status: 403, description: 'User Already exists!' })
  @ApiResponse({ status: 401, description: 'Unauthorized user' })
  @Post('signIn')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.userService.signIn(signInDto);
      response.cookie('access_token', user.accessToken);
      response.cookie('refresh_token', user.refreshToken);
      response.status(HttpStatus.OK).json({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
        role: user.userRole,
      });
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.CONFLICT)
        .json({ message: 'User not exist! wrong email or password' });
    }
  }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401, description: 'incorrect or invalid payload' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @Post('admin/createAccount')
  async createAdminAccount(
    @Body() createAdminDto: CreateAdminDto,
    @Req() Request: Request,
  ) {
    const adminIMG = Request['fileUrl'];
    return await this.userService.createAdminAccount(createAdminDto, adminIMG);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized user tokens' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  @Post('info')
  async userInfo(@Req() Request: Request) {
    const userID = Request['user'].user_id;
    return await this.userService.userInfo(userID);
  }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'invalid inputs' })
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Student)
  @Put('student/info')
  async setStudentInformation(
    @Body() studentForm: StudentFormDto,
    @Req() Request: Request,
  ) {
    const studentCV = Request['fileUrl'];
    const studentID = Request['user'].user_id;
    await this.userService.setStudentInformation(
      studentID,
      studentForm,
      studentCV,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Student information updated successfully',
    };
  }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'invalid inputs' })
  @UseInterceptors(FileInterceptor('file'), UploadInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @Put('instructor/info')
  async setInstructorInformation(
    @Body() instructorForm: InstructorFormDto,
    @Req() Request: Request,
  ) {
    const instructorCV = Request['fileUrl'];
    const instructorID = Request['user'].user_id;
    await this.userService.setInstructorInformation(
      instructorID,
      instructorForm,
      instructorCV,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Instructor information updated successfully',
    };
  }

  //   @Post('refresh-token')
  //   async refreshToken(
  //     @Res({ passthrough: true }) response: Response,
  //     @Req() req: Request,
  //   ) {
  //     const refresh_Token = request.cookies['refresh_token'];
  //     const newAccessToken = await this.userService.refreshToken(refresh_Token);
  //     if (!refresh_Token) {
  //       return response.status(401).send({ message: 'Refresh token not found' });
  //     }
  //     response.cookie('access_token', newAccessToken);
  //     return refresh_Token;
  //   }
}
