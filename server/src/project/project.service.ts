import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Instructors } from 'src/database/entities/instructor.entity';
import { Students } from 'src/database/entities/student.entity';
import { Users } from 'src/database/entities/user.entity';
import { col, fn, Sequelize, where } from 'sequelize';
import { Projects } from 'src/database/entities/project.entity';
import { ProjectParticipants } from 'src/database/entities/Project-Participants.entity';
import { Op } from 'sequelize';
import { Categories } from 'src/database/entities/category.entity';
import { Groups } from 'src/database/entities/groups.entity';
import { stringify } from 'querystring';
import { Tasks } from 'src/database/entities/project-task.entity';
import { UserGroups } from 'src/database/entities/user-groups.entity';

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
    @Inject('TASKS')
    private readonly tasksModel: typeof Tasks,
    @Inject('GROUPS')
    private readonly groupsModel: typeof Groups,
    @Inject('USERGROUPS')
    private readonly userGroups: typeof UserGroups,
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
          chat_groups: Sequelize.fn(
            'JSON_ARRAY_APPEND',
            Sequelize.col('chat_groups'),
            '$',
            ProjectGroup.group_id,
          ),
        },
        {
          where: {
            user_id: instructorID,
          },
        },
      );
      await this.participantsModel.create({
        project_id: newProject.project_id,
      });
      await this.groupsModel.create({
        group_name: createProjectDto.project_name,
        group_project: ProjectGroup.group_id,
      });
      return { message: 'project Created Successfully!' };
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
      return { message: 'Project updated successfully!' };
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

  async getStudentsRequests(projectID: string) {
    try {
      const studentsRequests = await this.participantsModel.findOne({
        where: { project_id: projectID },
        attributes: ['students_requests'],
      });
      if (!studentsRequests) {
        throw new Error('No requests found for the given project ID');
      }
      let userIds: number[];
      if (typeof studentsRequests.students_requests === 'string') {
        userIds = JSON.parse(studentsRequests.students_requests);
      } else if (Array.isArray(studentsRequests.students_requests)) {
        userIds = studentsRequests.students_requests.map(Number);
      } else {
        throw new Error(
          'Unexpected format for students_requests. Expected a string or array.',
        );
      }
      const studentsProfiles = await this.StudentModel.findAll({
        where: {
          user_id: {
            [Op.in]: userIds,
          },
        },
        include: [
          {
            model: Users,
          },
        ],
      });
      return studentsProfiles;
    } catch (error) {
      console.error('Error fetching student requests:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async topProjects() {
    try {
      const topProjects = await this.ProjectModel.findAll({
        where: {
          is_deleted: false,
          active: true,
        },
        limit: 6,
        include: {
          model: ProjectParticipants,
          as: 'participants',
        },
      });
      return topProjects;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async allProjects(name?: string) {
    try {
      const whereClause: any = {
        is_deleted: false,
      };
      if (name) {
        whereClause.name = { [Op.iLike]: `%${name}%` };
      }
      const allProjects = await this.ProjectModel.findAll({
        where: whereClause,
        include: [
          {
            model: Instructors,
            include: [
              {
                model: Users,
              },
            ],
          },
          {
            model: Categories,
          },
        ],
      });
      return allProjects;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProject(project_id: string) {
    try {
      const [affectedRows] = await this.ProjectModel.update(
        { is_deleted: true },
        { where: { project_id: project_id } },
      );
      if (affectedRows === 0) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Project deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async acceptStudent(project_id: string, student_id: string) {
    try {
      console.log(project_id, student_id);
      const studentRequest = await this.participantsModel.findOne({
        where: Sequelize.where(
          Sequelize.literal(
            `JSON_CONTAINS(students_requests, ${student_id}) AND project_id = ${project_id}`,
          ),
          true,
        ),
      });
      if (!studentRequest) {
        throw new HttpException(
          'Student request not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const student = await this.StudentModel.findByPk(student_id);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
      const updatedProjects = student.joined_projects
        ? [...student.joined_projects, project_id]
        : [project_id];
      await this.StudentModel.update(
        { joined_projects: updatedProjects },
        { where: { user_id: student_id } },
      );
      const updatedStudents = studentRequest.dataValues.joined_students
        ? [...studentRequest.dataValues.joined_students, student_id]
        : [student_id];
      studentRequest.update({ joined_Students: updatedStudents });
      const groupID = await this.groupsModel.findOne({
        where: {
          group_project: project_id,
        },
      });
      await this.userGroups.create({
        user_id: student_id,
        group_id: groupID.group_id,
      });
      return { message: 'Student accepted!' };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async makeRequestToProject(project_id: string, studentID: string) {
    try {
      const student = await this.StudentModel.findByPk(studentID);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
      const projectParticipant = await this.participantsModel.findOne({
        where: { project_id: project_id },
      });
      if (!projectParticipant) {
        return 'Project not found!';
      }
      let joinedStudents = projectParticipant.joined_Students || [];
      if (
        projectParticipant.students_requests &&
        projectParticipant.students_requests.includes(student.user_id)
      ) {
        return {
          message: 'You have already made a request to join this project',
        };
      }
      joinedStudents = [...joinedStudents, student.user_id];
      await projectParticipant.update(
        { students_requests: joinedStudents },
        { where: { project_id: project_id } },
      );
      return {
        message: 'Request to join the project has been sent successfully!',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
