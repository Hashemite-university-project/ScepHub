import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Projects } from 'src/database/entities/project.entity';
import { Users } from 'src/database/entities/user.entity';
import { Students } from 'src/database/entities/student.entity';
import { Instructors } from 'src/database/entities/instructor.entity';
import { ProjectParticipants } from 'src/database/entities/Project-Participants.entity';
import { Tasks } from 'src/database/entities/project-task.entity';
import { Sequelize } from 'sequelize';
import { UpdateTaskDto } from './dto/update-task.dto';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
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
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) {}

  async addTaskToStudent(
    TaskDto: CreateTaskDto,
    project_id: string,
    student_id: string,
    task_img: string,
  ) {
    try {
      const project = await this.ProjectModel.findOne({
        where: { project_id: project_id },
      });
      if (!project) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
      const student = await this.StudentModel.findOne({
        where: { user_id: student_id },
      });
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
      const newTask = await this.tasksModel.create({
        project_id: project_id,
        assigned_to: student_id,
        title: TaskDto.title,
        description: TaskDto.description,
        due_date: TaskDto.due_date,
        task_img: task_img,
      });
      return {
        message: 'Task created successfully!',
        task: newTask,
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTask(
    updateTaskDto: UpdateTaskDto,
    task_id: string,
    task_img: string,
    student_id: string,
  ) {
    try {
      const updatedTask = await this.tasksModel.findByPk(task_id);
      await this.tasksModel.update(
        {
          title: updateTaskDto.title || updatedTask.title,
          description: updateTaskDto.description || updatedTask.description,
          due_date: updateTaskDto.due_date || updatedTask.due_date,
          task_img: task_img || updatedTask.task_img,
          assigned_to: student_id || updatedTask.assigned_to,
        },
        {
          where: {
            task_id: task_id,
          },
        },
      );
      return { message: 'Task updated!' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTask(task_id: string) {
    try {
      const task = await this.tasksModel.findByPk(task_id);
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      await task.destroy();
      return { message: 'Task deleted successfully!' };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTaskDetails(task_id: string) {
    try {
      const taskDetails = await this.tasksModel.findOne({
        where: {
          task_id: task_id,
        },
      });
      return taskDetails;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStudentTasks(studentID: string) {
    try {
      const studentTasks = await this.tasksModel.findAll({
        where: {
          assigned_to: studentID,
        },
      });
      return studentTasks;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async taskDelivery(task_id: string, StudentID: string, task_link: string) {
    try {
      await this.tasksModel.update(
        {
          task_delivery: task_link,
          status: 'completed',
        },
        {
          where: { task_id: task_id, assigned_to: StudentID },
        },
      );
      return { message: 'Task delivered!' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async returnTask(task_id: string) {
    try {
      await this.tasksModel.update(
        {
          status: 'in_progress',
        },
        {
          where: {
            task_id: task_id,
          },
        },
      );
      return { message: 'Task returned!' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
