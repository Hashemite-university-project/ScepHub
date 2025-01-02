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
import { tasks } from 'googleapis/build/src/apis/tasks';
import { Skills } from 'src/database/entities/skills.entity';
import { Links } from 'src/database/entities/link.entity';
import { Enrollments } from 'src/database/entities/enrollment.entity';
import { AcceptedStudents } from 'src/database/entities/acceptedStudens.entity';
import { RejectedStudents } from 'src/database/entities/rejectedStudens.entity';

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
    @Inject('ACCEPTEDSTUDENTS')
    private readonly acceptedStudentsModel: typeof AcceptedStudents,
    @Inject('GROUPS')
    private readonly rejectedStudents: typeof RejectedStudents,
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
      let projectsID: any;
      projectsID = await this.participantsModel.findAll({
        where: Sequelize.where(
          Sequelize.fn(
            'JSON_CONTAINS',
            Sequelize.col('joined_Students'),
            JSON.stringify([`${StudentID}`]),
          ),
          true,
        ),
      });
      if (!projectsID || projectsID.length === 0) {
        return [];
      }
      const projectIds = projectsID.map(
        (participant: any) => participant.project_id,
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
                as: 'user',
              },
            ],
          },
          {
            model: Categories,
            as: 'category',
          },
          {
            model: Tasks,
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
            include: [
              {
                model: Users,
              },
            ],
          },
          {
            model: Categories,
            as: 'category',
          },
        ],
      });
      const participants = await this.StudentModel.findAll({
        include: [
          {
            model: Students,
            include: [
              {
                model: Users,
              },
            ],
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
        attributes: ['student_request_id'],
      });
      if (!studentsRequests) {
        throw new Error('No requests found for the given project ID');
      }
      const studentsProfiles = await this.participantsModel.findAll({
        include: [
          {
            model: Students,
            include: [
              {
                model: Users,
              },
            ],
          },
          {
            model: Skills,
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
        whereClause.project_name = { [Op.iLike]: `%${name}%` };
      }
      const allProjects = await this.ProjectModel.findAll({
        // where: whereClause,
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
          {
            model: ProjectParticipants,
          },
        ],
      });
      return allProjects;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProject(project_id: string) {
    try {
      const deletedProject = await this.ProjectModel.findByPk(project_id);
      if (deletedProject.is_deleted === false) {
        await deletedProject.update({ is_deleted: true });
        return { message: 'Project deleted successfully' };
      } else {
        await deletedProject.update({ is_deleted: false });
        return { message: 'Project returned successfully' };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async acceptStudent(project_id: string, student_id: string, status: boolean) {
    try {
      const projectParticipant = await this.participantsModel.findOne({
        where: { project_id },
      });
      if (!projectParticipant) {
        throw new HttpException(
          'student request not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const student = await this.StudentModel.findByPk(student_id);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
      if (status) {
        await this.acceptedStudentsModel.create({
          project_id: project_id,
          accepted_student: student.dataValues.student_id,
        });
        const group = await this.groupsModel.findOne({
          where: { group_project: project_id },
        });
        if (!group) {
          throw new HttpException(
            'Group not found for the project',
            HttpStatus.NOT_FOUND,
          );
        }
        await this.userGroups.create({
          user_id: student_id,
          group_id: group.group_id,
        });
        return { message: 'Student accepted successfully!' };
      } else {
        this.rejectedStudents.create({
          project_id: project_id,
          rejected_student: student.dataValues.user_id,
        });
        return { message: 'Student rejected successfully!' };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async makeRequestToProject(project_id: string, studentID: string) {
    try {
      const student = await this.StudentModel.findByPk(studentID);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const projectParticipant = await this.participantsModel.findOne({
        where: { project_id: project_id, student_request_id: student.user_id },
      });
      if (projectParticipant) {
        return { message: 'you have a;ready make a request to this project!' };
      } else {
        await this.participantsModel.create({
          project_id: project_id,
          student_request_id: student.user_id,
        });
        return {
          message: 'Request to join the project has been sent successfully!',
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstructorWorkSpace(instructorID: string) {
    try {
      const instructor = await this.InstructorModel.findOne({
        where: {
          instructor_id: instructorID,
        },
      });
      if (!instructor) {
        throw new HttpException('Instructor not found', HttpStatus.NOT_FOUND);
      }
      const projects = await this.ProjectModel.findAll({
        where: {
          project_instructor: instructor.id,
          is_deleted: false,
        },
        include: [
          {
            model: Categories,
            as: 'category',
          },
        ],
      });
      if (!projects.length) {
        return [];
      }
      const projectIds = projects.map((project) => project.project_id);
      const participants = await this.participantsModel.findAll({
        where: {
          project_id: projectIds,
        },
        attributes: [
          'project_id',
          [
            Sequelize.fn('COUNT', Sequelize.col('project_id')),
            'participantCount',
          ],
        ],
        group: ['project_id'],
      });
      const tasks = await this.tasksModel.findAll({
        where: {
          project_id: projectIds, // Array of project IDs
        },
        attributes: [
          'project_id',
          [Sequelize.fn('COUNT', Sequelize.col('project_id')), 'totalTasks'], // Total tasks per project
          [
            Sequelize.fn(
              'SUM',
              Sequelize.literal(
                'CASE WHEN status = "completed" THEN 1 ELSE 0 END',
              ),
            ),
            'completedTasks', // Completed tasks per project
          ],
        ],
        group: ['project_id'], // Group by project_id to calculate aggregates per project
      });
      const projectDetails = projects.map((project) => {
        const participantData = participants.find(
          (p) => p.project_id === project.project_id,
        );
        const taskData = tasks.find((t) => t.project_id === project.project_id);

        return {
          id: project.project_id,
          name: project.project_name,
          category: project.category?.category_name || 'Uncategorized',
          image: project.project_img,
          participantsCount: participantData
            ? parseInt(participantData.getDataValue('participantCount'))
            : 0,
          totalTasks: taskData
            ? parseInt(taskData.getDataValue('totalTasks'))
            : 0,
          completedTasks: taskData
            ? parseInt(taskData.getDataValue('completedTasks'))
            : 0,
        };
      });
      return projectDetails;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstructorWorkSpaceTasks(
    project_id: string,
    active: string,
    task_name: string,
  ) {
    try {
      let tasks: any;
      const searchCondition = task_name
        ? { title: { [Op.like]: `%${task_name}%` } }
        : {};
      //   if (active === 'Active') {
      const allTasks = await this.tasksModel.findAll({
        where: {
          project_id: project_id,
          //   due_date: { [Op.gt]: new Date() },
          //   ...searchCondition,
        },
        include: [
          {
            model: Students,
            include: [
              {
                model: Users,
              },
            ],
          },
        ],
      });
      tasks = allTasks.filter((task) => task.status === 'in_progress');

      const formattedData = {
        project_id,
        tasks,
      };
      return formattedData;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectTasksNumber(StudentID: string, project_id: string) {
    try {
      const studentAccount = await this.StudentModel.findOne({
        where: {
          user_id: StudentID,
        },
      });
      if (!studentAccount) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
      const tasks = await this.tasksModel.findAll({
        where: {
          project_id: project_id,
          assigned_to: studentAccount.user_id,
          status: 'in_progress',
        },
      });
      if (!tasks) {
        return { UncompletedTasks: 0, ClosestTimeToSubmit: null };
      }
      const closestTask = tasks.reduce((closest, task) => {
        const taskDueDate = new Date(task.due_date);
        const closestDueDate = closest ? new Date(closest.due_date) : null;
        return !closestDueDate || taskDueDate < closestDueDate ? task : closest;
      }, null);
      return {
        UncompletedTasks: tasks.length,
        ClosestTimeToSubmit: closestTask ? closestTask.due_date : null,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHomeProjectDetails(projectID: string) {
    try {
      const projectDetails = await this.ProjectModel.findOne({
        where: {
          project_id: projectID,
        },
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
            as: 'category',
          },
        ],
      });
      const participants = await this.acceptedStudentsModel.findAll({
        where: {
          project_id: projectID,
        },
        include: [
          {
            model: Students,
            include: [
              {
                model: Users,
              },
            ],
          },
        ],
      });
      return { project: projectDetails, number: participants.length };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async projectsForAdmin(search: string, page: number, limit: number) {
    try {
      const offset = (page - 1) * limit;
      const whereConditions: any = {
        project_name: {
          [Op.like]: `%${search}%`,
        },
      };
      const { rows, count } = await this.ProjectModel.findAndCountAll({
        where: whereConditions,
        limit: limit, // Limit number of results
        offset: offset, // Offset based on page
        include: [
          {
            model: Categories,
          },
          {
            model: Instructors,
            include: [
              {
                model: Users,
              },
            ],
          },
          {
            model: Tasks,
          },
          {
            model: AcceptedStudents,
          },
          {
            model: RejectedStudents,
          },
          {
            model: ProjectParticipants,
          },
        ],
      });
      //   const projectsWithMemberCounts = rows.map((project) => {
      //     const participants = project.participants || [];
      //     const totalMembers = participants.reduce((count, participant) => {
      //       if (!participant.joined_Students) {
      //         return count;
      //       }
      //       const students =
      //         typeof participant.joined_Students === 'string'
      //           ? JSON.parse(participant.joined_Students)
      //           : participant.joined_Students;
      //       return count + (Array.isArray(students) ? students.length : 0);
      //     }, 0);
      //     return {
      //       ...project.get(),
      //       numberOfMembers: totalMembers,
      //     };
      //   });
      // Calculate total pages for pagination
      const totalPages = Math.ceil(count / limit);
      return {
        // projects: projectsWithMemberCounts,
        totalPages,
        currentPage: page,
        totalItems: count,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllJoinedStudents(project_id: string) {
    try {
      const joinedStudentsIDs = await this.participantsModel.findOne({
        where: {
          project_id: project_id,
        },
      });
      const joinedStudentsArray = JSON.parse(
        joinedStudentsIDs.dataValues.joined_Students,
      );
      console.log(joinedStudentsIDs.dataValues.joined_Students); //["4", "7"]
      const joinedStudents = await this.StudentModel.findAll({
        where: {
          user_id: {
            [Op.in]: joinedStudentsArray.map((id: string) => BigInt(id)), // Convert string IDs to BigInt
          },
        },
        include: [
          {
            model: Users,
          },
        ],
      });
      return joinedStudents;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
