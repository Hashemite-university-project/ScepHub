import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Client } from 'pg';
import { Roles } from './entities/role.entity';
import { Users } from './entities/user.entity';
import { Students } from './entities/student.entity';
import { Admins } from './entities/admin.entity';
import { Instructors } from './entities/instructor.entity';
import { Courses } from './entities/course.entity';
import { Projects } from './entities/project.entity';
import { Tasks } from './entities/project-task.entity';
import { Contents } from './entities/course-videos.entity';
import { Messages } from './entities/message.entity';
import { Categories } from './entities/category.entity';
import { Links } from './entities/link.entity';
import { Payments } from './entities/payment.entity';
import { Ratings } from './entities/rate.entity';
import { Reports } from './entities/report.entity';
import { Contactus } from './entities/contact-us.entity';
import { ProjectParticipants } from './entities/Project-Participants.entity';
import { Clients } from './entities/client.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const pgClient = new Client({
        host: process.env.HOST,
        port: 5432,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      });

      try {
        await pgClient.connect();
        const res = await pgClient.query(
          `SELECT 1 FROM pg_database WHERE datname = '${process.env.DATABASE_NAME}'`,
        );

        if (res.rowCount === 0) {
          await pgClient.query(
            `CREATE DATABASE "${process.env.DATABASE_NAME}"`,
          );
        }

        await pgClient.end();
      } catch (error) {
        console.error('Error checking/creating database:', error);
        throw error;
      }

      const sequelize = new Sequelize({
        dialect: process.env.DIALECT as Dialect,
        host: process.env.HOST,
        port: 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: false,
      });
      sequelize.addModels([
        Users,
        Roles,
        Students,
        Admins,
        Instructors,
        Courses,
        Projects,
        Tasks,
        Contents,
        Messages,
        Categories,
        Links,
        Payments,
        Ratings,
        Reports,
        Contactus,
        ProjectParticipants,
        Clients,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
