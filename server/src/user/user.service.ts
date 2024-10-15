import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create/create-user.dto';
import { Users } from 'src/database/entities/user.entity';
import { Jwtservice } from 'src/auth/jwt-service/jwt-service.service';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';
import { Students } from 'src/database/entities/student.entity';
import { Sequelize } from 'sequelize';
import { SignInDto } from './dto/sign-in.dto';
import { Instructors } from 'src/database/entities/instructor.entity';
import { StudentFormDto } from './dto/update/update-student.dto';
import { InstructorFormDto } from './dto/update/update-Instructor.dto';
import { CreateAdminDto } from './dto/create/create-admin.dto';
import { Admins } from 'src/database/entities/admin.entity';
import { Clients } from 'src/database/entities/client.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly UserModel: typeof Users,
    @Inject('STUDENT_REPOSITORY')
    private readonly StudentModel: typeof Students,
    @Inject('INSTRUCTOR_REPOSITORY')
    private readonly InstructorModel: typeof Clients,
    @Inject('CLIENTS_REPOSITORY')
    private readonly ClientModel: typeof Instructors,
    @Inject('ADMIN_REPOSITORY')
    private readonly adminModel: typeof Admins,
    private readonly jwtService: Jwtservice,
    private readonly bcryptService: BcryptService,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) {}

  async StudentSignUp(createStudentDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const hashedPassword = await this.bcryptService.hash(
        createStudentDto.password,
      );
      const newUser = await this.UserModel.create(
        {
          user_name: createStudentDto.user_name,
          user_email: createStudentDto.user_email,
          password: hashedPassword,
          phone_number: createStudentDto.phone_number,
          role: 1,
        },
        { transaction },
      );
      await this.StudentModel.create(
        { user_id: newUser.dataValues.user_id },
        { transaction },
      );
      await transaction.commit();
      const access_token = await this.jwtService.generateAccessToken(
        newUser.dataValues.user_id,
        newUser.dataValues.user_email,
        newUser.dataValues.role,
      );
      const refreshToken = await this.jwtService.generateRefreshToken(
        newUser.dataValues.user_id,
        newUser.dataValues.user_email,
        newUser.dataValues.role,
      );
      const role = newUser.role;
      return { access_token, refreshToken, role };
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw new ConflictException();
    }
  }

  async studentSignIn(studentSignInDto: SignInDto) {
    try {
      const student = await this.UserModel.findOne({
        where: { user_email: studentSignInDto.user_email },
      });
      //   console.log(student);
      if (!student) throw new NotFoundException();
      const passwordCompare = await this.bcryptService.compare(
        studentSignInDto.password,
        student.dataValues.password,
      );
      if (!passwordCompare) throw new UnauthorizedException();
      if (student.dataValues.role != 1) throw new ForbiddenException();
      const token = await this.jwtService.generateAccessToken(
        student.dataValues.user_id,
        student.dataValues.user_email,
        student.dataValues.role,
      );
      const refreshToken = await this.jwtService.generateRefreshToken(
        student.dataValues.user_id,
        student.dataValues.user_email,
        student.dataValues.role,
      );
      const role = student.role;
      return { token, refreshToken, role };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   async clientSignUp(createClientDto: CreateUserDto) {
  //     const transaction = await this.sequelize.transaction();
  //     try {
  //       const hashedPassword = await this.bcryptService.hash(
  //         createClientDto.password,
  //       );
  //       const newUser = await this.UserModel.create(
  //         {
  //           user_name: createClientDto.user_name,
  //           user_email: createClientDto.user_email,
  //           password: hashedPassword,
  //           phone_number: createClientDto.phone_number,
  //           role: 4,
  //         },
  //         { transaction },
  //       );
  //       const newClient = await this.ClientModel.create(
  //         {
  //           user_id: newUser.dataValues.user_id,
  //         },
  //         { transaction },
  //       );
  //       await transaction.commit();
  //       const token = await this.jwtService.generateAccessToken(
  //         newUser.dataValues.user_id,
  //         newUser.dataValues.user_email,
  //         newUser.dataValues.role,
  //       );
  //       const refreshToken = await this.jwtService.generateRefreshToken(
  //         newUser.dataValues.user_id,
  //         newUser.dataValues.user_email,
  //         newUser.dataValues.role,
  //       );
  //       return { token, refreshToken };
  //     } catch (error) {
  //       await transaction.rollback();
  //       console.log(error);
  //       throw new ConflictException();
  //     }
  //   }

  //   async clientSignIn(clientSignInDto: SignInDto) {
  //     try {
  //       const client = await this.UserModel.findOne({
  //         where: { user_email: clientSignInDto.user_email },
  //       });
  //       if (!client) throw new NotFoundException();
  //       const passwordCompare = await this.bcryptService.compare(
  //         clientSignInDto.password,
  //         client.dataValues.password,
  //       );
  //       if (!passwordCompare) throw new UnauthorizedException();
  //       if (client.dataValues.role != 4) throw new ForbiddenException();
  //       const token = await this.jwtService.generateAccessToken(
  //         client.dataValues.user_id,
  //         client.dataValues.user_email,
  //         client.dataValues.role,
  //       );
  //       const refreshToken = await this.jwtService.generateRefreshToken(
  //         client.dataValues.user_id,
  //         client.dataValues.user_email,
  //         client.dataValues.role,
  //       );
  //       return { token, refreshToken };
  //     } catch (error) {
  //       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  async instructorSignUp(createInstructorDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const hashedPassword = await this.bcryptService.hash(
        createInstructorDto.password,
      );
      const newUser = await this.UserModel.create(
        {
          user_name: createInstructorDto.user_name,
          user_email: createInstructorDto.user_email,
          password: hashedPassword,
          phone_number: createInstructorDto.phone_number,
          role: 2,
        },
        { transaction },
      );
      await this.InstructorModel.create(
        {
          user_id: newUser.dataValues.user_id,
          major: createInstructorDto.major,
        },
        { transaction },
      );
      await transaction.commit();
      const token = await this.jwtService.generateAccessToken(
        newUser.dataValues.user_id,
        newUser.dataValues.user_email,
        newUser.dataValues.role,
      );
      const refreshToken = await this.jwtService.generateRefreshToken(
        newUser.dataValues.user_id,
        newUser.dataValues.user_email,
        newUser.dataValues.role,
      );
      const role = newUser.role;
      return { token, refreshToken, role };
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw new ConflictException();
    }
  }

  async instructorSignIn(InstructorSignInDto: SignInDto) {
    try {
      const instructor = await this.UserModel.findOne({
        where: { user_email: InstructorSignInDto.user_email },
      });
      if (!instructor) throw new NotFoundException();
      const passwordCompare = await this.bcryptService.compare(
        InstructorSignInDto.password,
        instructor.dataValues.password,
      );
      if (!passwordCompare) throw new UnauthorizedException();
      if (instructor.dataValues.role != 2) throw new ForbiddenException();
      const token = await this.jwtService.generateAccessToken(
        instructor.dataValues.user_id,
        instructor.dataValues.user_email,
        instructor.dataValues.role,
      );
      const refreshToken = await this.jwtService.generateRefreshToken(
        instructor.dataValues.user_id,
        instructor.dataValues.user_email,
        instructor.dataValues.role,
      );
      const role = instructor.role;
      return { token, refreshToken, role };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async adminSignIn(adminSignInDto: SignInDto) {
    try {
      const admin = await this.UserModel.findOne({
        where: { user_email: adminSignInDto.user_email },
      });
      if (!admin) throw new NotFoundException();
      const passwordCompare = await this.bcryptService.compare(
        adminSignInDto.password,
        admin.dataValues.password,
      );
      if (!passwordCompare) throw new UnauthorizedException();
      if (admin.dataValues.role != 3) throw new ForbiddenException();
      const token = await this.jwtService.generateAccessToken(
        admin.dataValues.user_id,
        admin.dataValues.user_email,
        admin.dataValues.role,
      );
      const refreshToken = await this.jwtService.generateRefreshToken(
        admin.dataValues.user_id,
        admin.dataValues.user_email,
        admin.dataValues.role,
      );
      const role = admin.role;
      return { token, refreshToken, role };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createAdminAccount(createAdminDto: CreateAdminDto, adminIMG: string) {
    const transaction = await this.sequelize.transaction();
    try {
      const hashedPassword = await this.bcryptService.hash(
        createAdminDto.password,
      );
      const newAdmin = await this.UserModel.create(
        {
          user_name: createAdminDto.user_name,
          user_email: createAdminDto.user_email,
          password: hashedPassword,
          phone_number: createAdminDto.phone_number,
          role: 3,
          user_img: adminIMG,
        },
        { transaction },
      );
      await this.adminModel.create(
        {
          user_id: newAdmin.dataValues.user_id,
          department: createAdminDto.department,
        },
        { transaction },
      );
      await transaction.commit();
      return newAdmin;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   async refreshToken(refreshToken: string) {
  //     try {
  //       const refreshPayload =
  //         await this.jwtService.verifyRefreshToken(refreshToken);
  //       const newAccessToken = await this.jwtService.generateAccessToken(
  //         refreshPayload.user_id,
  //         refreshPayload.user_email,
  //         refreshPayload.role,
  //       );
  //       return newAccessToken;
  //     } catch (error) {
  //       throw new UnauthorizedException('Invalid or expired refresh token');
  //     }
  //   }

  async setStudentInformation(
    studentID: string,
    studentForm: StudentFormDto,
    studentCV: string,
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      const student = await this.StudentModel.findOne({
        where: {
          user_id: studentID,
        },
        transaction,
      });
      if (!student) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const updatedData = await student.update(
        {
          skills: studentForm.skills,
          university_name: studentForm.university_name,
          major: studentForm.major,
          about_me: studentForm.about_me,
          user_cv: studentCV,
        },
        { transaction },
      );
      await transaction.commit();
      return updatedData.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async setInstructorInformation(
    instructorID: string,
    instructorForm: InstructorFormDto,
    instructorCV: string,
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      const instructor = await this.InstructorModel.findOne({
        where: {
          user_id: instructorID,
        },
        transaction,
      });
      if (!instructor) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const instructorData = await instructor.update(
        {
          skills: instructorForm.skills,
          major: instructorForm.major,
          about_me: instructorForm.about_me,
          user_cv: instructorCV,
        },
        { transaction },
      );
      await transaction.commit();
      return instructorData.dataValues;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
