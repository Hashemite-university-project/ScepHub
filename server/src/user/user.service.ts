import {
  ConflictException,
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

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly UserModel: typeof Users,
    @Inject('STUDENT_REPOSITORY')
    private readonly StudentModel: typeof Students,
    @Inject('INSTRUCTOR_REPOSITORY')
    private readonly InstructorModel: typeof Instructors,
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
      //   throw new ConflictException();
    }
  }

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
          instructor_id: newUser.dataValues.user_id,
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

  async userInfo(userID: string) {
    try {
      const userInfo = await this.UserModel.findByPk(userID);
      if (!userInfo) throw new NotFoundException();
      return userInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(clientSignInDto: SignInDto) {
    try {
      const user = await this.UserModel.findOne({
        where: { user_email: clientSignInDto.user_email },
      });
      if (!user) throw new NotFoundException();
      const passwordCompare = await this.bcryptService.compare(
        clientSignInDto.password,
        user.dataValues.password,
      );
      if (!passwordCompare) throw new UnauthorizedException();
      const accessToken = await this.jwtService.generateAccessToken(
        user.dataValues.user_id,
        user.dataValues.user_email,
        user.dataValues.role,
      );
      const refreshToken = await this.jwtService.generateRefreshToken(
        user.dataValues.user_id,
        user.dataValues.user_email,
        user.dataValues.role,
      );
      const userRole = user.role;
      return { accessToken, refreshToken, userRole };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
          instructor_id: instructorID,
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
}
