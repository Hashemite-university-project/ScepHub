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

  @ApiResponse({ status: 200, description: 'must return access token' })
  @ApiResponse({ status: 401, description: 'Already exists' })
  @Post('student/signIn')
  async studentSignIn(
    @Body() studentSignInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const student = await this.userService.studentSignIn(studentSignInDto);
    response.cookie('access_token', student.token);
    response.cookie('refresh_token', student.refreshToken);
    response.status(HttpStatus.OK).json({
      access_token: student.token,
      refresh_token: student.refreshToken,
      role: student.role,
    });
  }

  //   @ApiResponse({ status: 201, description: 'must return access token' })
  //   @ApiResponse({ status: 403, description: 'Already exists' })
  //   @Post('client/signUp')
  //   async clientSignUp(
  //     @Body() createStudentDto: CreateUserDto,
  //     @Res({ passthrough: true }) response: Response,
  //   ) {
  //     try {
  //       const newClient = await this.userService.clientSignUp(createStudentDto);
  //       response.cookie('access_token', newClient.token);
  //       response.cookie('refresh_token', newClient.refreshToken);
  //       response.status(HttpStatus.CREATED).json({
  //         access_token: newClient.token,
  //         refresh_token: newClient.refreshToken,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       response
  //         .status(HttpStatus.CONFLICT)
  //         .json({ message: 'The Email or Phone number is already exist!' });
  //     }
  //   }

  //   @ApiResponse({ status: 200, description: 'must return access token' })
  //   @ApiResponse({ status: 403, description: 'Already exists' })
  //   @Post('client/signIn')
  //   async clientSignIn(
  //     @Body() createStudentDto: CreateUserDto,
  //     @Res({ passthrough: true }) response: Response,
  //   ) {
  //     try {
  //       const client = await this.userService.clientSignIn(createStudentDto);
  //       response.cookie('access_token', client.token);
  //       response.cookie('refresh_token', client.refreshToken);
  //       response.status(HttpStatus.OK).json({
  //         access_token: client.token,
  //         refresh_token: client.refreshToken,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       response
  //         .status(HttpStatus.CONFLICT)
  //         .json({ message: 'The Email or Phone number is already exist!' });
  //     }
  //   }

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

  @ApiResponse({ status: 200, description: 'must return an access token' })
  @ApiResponse({ status: 401, description: 'incorrect password' })
  @Post('instructor/signIn')
  async instructorSignIn(
    @Body() instructorSignIn: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const instructor =
      await this.userService.instructorSignIn(instructorSignIn);
    response.cookie('access_token', instructor.token);
    response.cookie('refresh_token', instructor.refreshToken);
    response.status(HttpStatus.OK).json({
      access_token: instructor.token,
      refresh_token: instructor.refreshToken,
      role: instructor.role,
    });
  }

  @ApiResponse({ status: 200, description: 'must return an access token' })
  @ApiResponse({ status: 401, description: 'incorrect password' })
  @Post('admin/signIn')
  async adminSignIn(
    @Body() adminSignIn: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const admin = await this.userService.adminSignIn(adminSignIn);
    response.cookie('access_token', admin.token);
    response.cookie('refresh_token', admin.refreshToken);
    response.status(HttpStatus.OK).json({
      access_token: admin.token,
      refresh_token: admin.refreshToken,
      role: admin.role,
    });
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
    await this.userService.setinstructorInformation(
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
