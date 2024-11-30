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
import { Feedback } from 'src/database/entities/FAQ.entity';
import { Op } from 'sequelize';
import { Projects } from 'src/database/entities/project.entity';
import { Categories } from 'src/database/entities/category.entity';
import { Enrollments } from 'src/database/entities/enrollment.entity';
import { Skills } from 'src/database/entities/skills.entity';
import { Links } from 'src/database/entities/link.entity';
import { Courses } from 'src/database/entities/course.entity';

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
    @Inject('PROJECTS_REPOSITORY')
    private readonly ProjectModel: typeof Projects,
    @Inject('FEEDBACK')
    private readonly feedbackModel: typeof Feedback,
    @Inject('ENROLLMENTS')
    private readonly enrollmentsModel: typeof Enrollments,
    @Inject('COURSE_REPOSITORY') private readonly CourseModel: typeof Courses,
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
      const userAccount = await this.UserModel.findOne({
        where: {
          user_email: createStudentDto.user_email,
          phone_number: createStudentDto.phone_number,
        },
      });
      if (userAccount) {
        throw new ConflictException();
      }
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
      return {
        status: 'success',
        access_token,
        refreshToken,
        role: newUser.role,
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
    }
  }

  async instructorSignUp(createInstructorDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const userAccount = await this.UserModel.findOne({
        where: {
          user_email: createInstructorDto.user_email,
          phone_number: createInstructorDto.phone_number,
        },
      });
      if (userAccount) {
        throw new ConflictException();
      }
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
      console.log(userInfo);
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
    instructorImage: string,
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
        },
        { transaction },
      );
      await this.UserModel.update(
        {
          user_img: instructorImage,
        },
        { where: { user_id: instructorID } },
      );
      await transaction.commit();
      return instructorData.dataValues;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async feedback() {
    try {
      const usersFeedback = await this.feedbackModel.findAll({
        include: [
          {
            model: Users,
            include: [
              {
                model: Students,
                required: false,
              },
              {
                model: Instructors,
                required: false,
              },
            ],
          },
        ],
      });
      const results = usersFeedback.map((feedback) => {
        const user = feedback.user;
        if (user.role.toString() === '1') {
          return { ...feedback.toJSON(), relatedUser: user.student };
        } else if (user.role.toString() === '2') {
          return { ...feedback.toJSON(), relatedUser: user.instructor };
        }
        return feedback;
      });
      return results;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async userProfile(userID: string) {
    try {
      console.log(userID);
      const userProfile = await this.UserModel.findByPk(userID);
      if (!userProfile) {
        throw new Error('User not found');
      }
      if (userProfile.role.toString() === '1') {
        const studentProfile = await this.StudentModel.findOne({
          where: {
            user_id: userID,
          },
          include: [
            {
              model: Users,
              as: 'user',
            },
            {
              model: Skills,
            },
            {
              model: Links,
            },
          ],
        });
        let arrays = String(studentProfile.joined_projects);
        const joinedProjects = JSON.parse(arrays);
        console.log('sssssssssssssssss', userID);
        let studentProjects: any;
        if (joinedProjects) {
          studentProjects = await this.ProjectModel.findAll({
            where: {
              project_id: {
                [Op.in]: joinedProjects,
              },
            },
            include: [
              {
                model: Instructors,
                as: 'instructor',
              },
              {
                model: Categories,
                as: 'category',
              },
            ],
          });
        } else {
          studentProjects = null;
        }
        const studentCourses = await this.enrollmentsModel.findAll({
          where: {
            student_id: studentProfile.user_id,
            payed_for: true,
          },
        });
        return {
          user: studentProfile,
          projects: studentProjects,
          courses: studentCourses,
          role: userProfile.role,
        };
      } else if (userProfile.role.toString() === '2') {
        const instructorProfile = await this.InstructorModel.findOne({
          where: {
            instructor_id: userID,
          },
          include: [
            {
              model: Users,
            },
          ],
        });
        const instructorProjects = await this.ProjectModel.findAll({
          where: {
            project_instructor: instructorProfile.id,
          },
        });
        const instructorCourses = await this.CourseModel.findAll({
          where: {
            course_instructor: instructorProfile.id,
          },
        });
        return {
          user: instructorProfile,
          projects: instructorProjects,
          courses: instructorCourses,
          role: userProfile.role,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async popularStudents() {
    try {
      const topStudents = await Students.findAll({
        where: Sequelize.where(
          Sequelize.fn('JSON_LENGTH', Sequelize.col('joined_projects')),
          { [Op.gt]: 2 },
        ),
        attributes: [
          'user_id',
          'joined_projects',
          'university_name',
          'major',
          'about_me',
        ],
        include: [
          {
            model: Users,
            attributes: ['user_name', 'user_email', 'user_img'],
          },
        ],
        limit: 3,
      });
      return topStudents;
    } catch (error) {
      throw new Error(`Failed to fetch top students: ${error.message}`);
    }
  }

  async getAllUsersById(role: string) {
    try {
      console.log(role);
      let allUsers: any;
      if (role === '1') {
        allUsers = await this.StudentModel.findAll({
          include: [
            {
              model: Users,
            },
          ],
        });
      } else if (role === '2') {
        allUsers = await this.InstructorModel.findAll({
          include: [
            {
              model: Users,
            },
          ],
        });
      } else {
        allUsers = await this.adminModel.findAll({
          include: [
            {
              model: Users,
            },
          ],
        });
      }
      return allUsers;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
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
