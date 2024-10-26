import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Instructors } from 'src/database/entities/instructor.entity';
import { Students } from 'src/database/entities/student.entity';
import { Users } from 'src/database/entities/user.entity';
import { Sequelize } from 'sequelize';
import { Projects } from 'src/database/entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECTS_REPOSITORY')
    private readonly ProjectModel: typeof Projects,
    @Inject('USER_REPOSITORY') private readonly UserModel: typeof Users,
    @Inject('STUDENT_REPOSITORY')
    private readonly StudentModel: typeof Students,
    @Inject('INSTRUCTOR_REPOSITORY')
    private readonly InstructorModel: typeof Instructors,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) {}

  async getStudentProject(userID: string) {
    try {
      const user = await this.StudentModel.findByPk(userID);
      if (!user) throw new NotFoundException('No user data!');
      const enrolledProjectIds = user.joined_projects;
      if (!enrolledProjectIds || enrolledProjectIds.length === 0) {
        throw new NotFoundException('No enrolled projects found!');
      }
      const studentProjects = await this.ProjectModel.findAll({
        where: {
          project_id: enrolledProjectIds,
        },
      });
      if (studentProjects.length === 0) {
        return 'No projects found for the enrolled IDs!';
      }
      return studentProjects;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
