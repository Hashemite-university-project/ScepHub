import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Instructors } from 'src/database/entities/instructor.entity';
import { Students } from 'src/database/entities/student.entity';
import { Users } from 'src/database/entities/user.entity';
import { Sequelize } from 'sequelize';
import { Projects } from 'src/database/entities/project.entity';
import { ProjectParticipants } from 'src/database/entities/Project-Participants.entity';
import { Op } from 'sequelize';
import { Categories } from 'src/database/entities/category.entity';
import { Groups } from 'src/database/entities/groups.entity';

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
    @Inject('PROJECTPARTICIPANTS')
    private readonly participantsModel: typeof ProjectParticipants,
    @Inject('GROUPS')
    private readonly groupsModel: typeof Groups,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) {}

  async createNewProject(
    createProjectDto: CreateProjectDto,
    project_img: string,
    instructorID: string,
  ) {
    try {
      const InstructorIDFromInstructorModel =
        await this.InstructorModel.findOne({
          where: {
            instructor_id: instructorID,
          },
        });
      const projectName = await this.ProjectModel.findOne({
        where: { project_name: createProjectDto.project_name },
      });
      if (projectName) {
        return 'The project name is already exist!';
      }
      const newProject = await this.ProjectModel.create({
        project_name: createProjectDto.project_name,
        project_description: createProjectDto.project_description,
        project_img: project_img,
        project_instructor: InstructorIDFromInstructorModel.id,
        project_category: createProjectDto.project_category,
        start_date: createProjectDto.start_date || null,
        end_date: createProjectDto.end_date,
        required_skills: createProjectDto.required_skills,
      });
      const ProjectGroup = await this.groupsModel.create({
        group_name: createProjectDto.project_name,
        group_project: newProject.project_id,
      });
      await this.UserModel.update(
        {
          group_id: ProjectGroup.group_id,
        },
        {
          where: {
            user_id: instructorID,
          },
        },
      );
      return 'project Created Successfully!';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async UpdateProject(
    updateProjectDto: UpdateProjectDto,
    project_img: string,
    projectID: string,
  ) {
    try {
      const project = await this.ProjectModel.findByPk(projectID);
      if (!project) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
      await this.ProjectModel.update(
        {
          project_name: updateProjectDto.project_name || project.project_name,
          project_description:
            updateProjectDto.project_description || project.project_description,
          project_img: project_img || project.project_img,
          project_category:
            updateProjectDto.project_category || project.project_category,
          start_date: updateProjectDto.start_date || project.start_date,
          end_date: updateProjectDto.end_date || project.end_date,
          required_skills:
            updateProjectDto.required_skills || project.required_skills,
        },
        {
          where: { project_id: projectID },
        },
      );
      return 'Project updated successfully!';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInstructorProjects(instructorID: string, projectName?: string) {
    try {
      const instructorIDFromInstructorModel =
        await this.InstructorModel.findOne({
          where: {
            instructor_id: instructorID,
          },
        });
      const query = {
        where: {
          project_instructor: instructorIDFromInstructorModel.id,
          is_deleted: false,
          ...(projectName && {
            project_name: {
              [Op.like]: `%${projectName}%`,
            },
          }),
        },
        include: [
          {
            model: Categories,
            as: 'category',
          },
        ],
      };
      const projects = await this.ProjectModel.findAll(query);
      return projects;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProjectStudents(StudentID: string) {
    try {
      const projectsID = await this.participantsModel.findAll({
        where: Sequelize.where(
          Sequelize.fn(
            'JSON_CONTAINS',
            Sequelize.col('joined_Students'),
            Sequelize.literal(`'[${StudentID}]'`),
          ),
          true,
        ),
      });
      if (!projectsID || projectsID.length === 0) {
        return [];
      }
      const projectIds = projectsID.map(
        (participant) => participant.project_id,
      );
      const studentProjects = await this.ProjectModel.findAll({
        where: {
          project_id: projectIds,
        },
        include: [
          {
            model: Instructors,
            as: 'instructor',
            include: [
              {
                model: Users,
                as: 'instructor',
              },
            ],
          },
          {
            model: Categories,
            as: 'category',
          },
        ],
      });
      return studentProjects;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProjectDetails(projectID: string) {
    try {
      const projectDetails = await this.ProjectModel.findOne({
        where: {
          project_id: projectID,
        },
        include: [
          {
            model: Instructors,
            as: 'instructor',
            include: [
              {
                model: Users,
                as: 'instructor',
              },
            ],
          },
          {
            model: Categories,
            as: 'category',
          },
        ],
      });
      const projectParticipants = await this.participantsModel.findOne({
        where: {
          project_id: projectID,
        },
      });
      let joinedStudentIds: bigint[] = [];
      if (projectParticipants && projectParticipants.joined_Students) {
        const studentsString = projectParticipants.joined_Students;
        if (typeof studentsString === 'string') {
          joinedStudentIds = JSON.parse(studentsString).map((id: string) =>
            BigInt(id),
          );
        } else if (Array.isArray(studentsString)) {
          joinedStudentIds = studentsString.map((id) => BigInt(id));
        }
      }
      const participants = await this.StudentModel.findAll({
        where: {
          user_id: {
            [Op.in]: joinedStudentIds,
          },
        },
        include: [
          {
            model: Users,
            as: 'user',
          },
        ],
      });
      return { projectDetails, participants };
    } catch (error) {
      console.log('Error in getProjectDetails:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
