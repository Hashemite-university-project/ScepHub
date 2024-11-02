import {
  //   ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Courses } from 'src/database/entities/course.entity';
import { Instructors } from 'src/database/entities/instructor.entity';
import { Users } from 'src/database/entities/user.entity';
import { Categories } from 'src/database/entities/category.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { Contents } from 'src/database/entities/course-videos.entity';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY') private readonly CourseModel: typeof Courses,
    @Inject('INSTRUCTOR_REPOSITORY')
    private readonly InstructorModel: typeof Instructors,
    @Inject('CONTENT_REPOSITORY')
    private readonly contentModel: typeof Contents,
    private readonly paymentService: PaymentService,
    @Inject('CATEGORY_REPOSITORY')
    private readonly CategoryModel: typeof Categories,
  ) {}

  async getAllCourses() {
    try {
      const allCourses = await this.CourseModel.findAll({
        where: { is_deleted: false },
        include: [
          {
            model: Instructors,
            attributes: ['major'],
            include: [
              {
                model: Users,
                attributes: ['user_name'],
              },
            ],
          },
          {
            model: Categories,
            attributes: ['category_name'],
          },
        ],
      });
      return allCourses;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCourseDetails(courseID: string, studentID: string, role: any) {
    try {
      const course = await this.CourseModel.findByPk(courseID);
      if (course.is_deleted === true) {
        return 'This course has been deleted and is no longer available.';
      }
      const studentSubscription =
        await this.paymentService.getSubscriptionStatus(studentID, role);
      let course_content: any;
      if (role !== '1' || studentSubscription.status === 'active') {
        course_content = await this.contentModel.findAll({
          where: {
            course_id: courseID,
          },
        });
      } else {
        course_content = await this.contentModel.findOne({
          where: {
            course_id: courseID,
          },
          order: [['createdAt', 'ASC']],
        });
      }
      return course_content;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNewCourse(
    createCourseDto: CreateCourseDto,
    course_img: string,
    instructorID: string,
  ) {
    try {
      const instructor = await this.InstructorModel.findOne({
        where: { instructor_id: instructorID },
      });
      const newCourse = await this.CourseModel.create({
        course_name: createCourseDto.course_name,
        course_description: createCourseDto.course_description,
        course_category: createCourseDto.course_category,
        course_img: course_img,
        created_at: new Date(),
        course_instructor: instructor.dataValues.instructor_id,
      });
      return newCourse;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllInstructorCourse(instructorID: string) {
    try {
      const allCourses = await this.CourseModel.findAll({
        where: { course_instructor: instructorID, is_deleted: false },
        include: [
          {
            model: Instructors,
            attributes: ['major'],
            include: [
              {
                model: Users,
                attributes: ['user_name'],
              },
            ],
          },
        ],
      });
      return allCourses;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
    course_img: string,
  ) {
    try {
      const course = await this.CourseModel.findByPk(id);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      const updatedCourse = await course.update({
        course_name: updateCourseDto.course_name || course.course_name,
        course_description:
          updateCourseDto.course_description || course.course_description,
        course_category:
          updateCourseDto.course_category || course.course_category,
        course_img: course_img || course.course_img,
      });
      return updatedCourse;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   async findOneCourse(id: string) {
  //     try {
  //       const course = await this.CourseModel.findByPk(id, {
  //         include: [
  //           {
  //             model: Instructors,
  //             attributes: ['major'],
  //             include: [
  //               {
  //                 model: Users,
  //                 attributes: ['user_name'],
  //               },
  //             ],
  //           },
  //           {
  //             model: Categories,
  //             attributes: ['category_name'],
  //           },
  //         ],
  //       });
  //       return course;
  //     } catch (error) {
  //       console.error(error);
  //       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  async removeCourse(id: string) {
    try {
      const [numberOfAffectedRows] = await this.CourseModel.update(
        { is_deleted: true },
        { where: { course_id: id } },
      );
      if (numberOfAffectedRows === 0) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Course marked as deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCourseContent(
    createContentDto: CreateContentDto,
    id: string,
    course_vid: string,
    instructorID: string,
  ) {
    try {
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
