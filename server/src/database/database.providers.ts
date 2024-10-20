import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Client } from 'pg';
import * as mysql from 'mysql2/promise';
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
import * as dotenv from 'dotenv';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const dialect = process.env.DIALECT as Dialect;

      const host = process.env.HOST;
      const port = Number(process.env.PORT);
      const username = process.env.DATABASE_USERNAME;
      const password = process.env.DATABASE_PASSWORD;
      const databaseName = process.env.DATABASE_NAME;

      const checkAndCreatePostgresDB = async () => {
        const pgClient = new Client({ host, port, user: username, password });

        try {
          await pgClient.connect();
          const res = await pgClient.query(
            `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`,
          );

          if (res.rowCount === 0) {
            await pgClient.query(`CREATE DATABASE "${databaseName}"`);
          }

          await pgClient.end();
        } catch (error) {
          console.error('Error checking/creating PostgreSQL database:', error);
          throw error;
        }
      };

      const checkAndCreateMySQLDB = async () => {
        const connection = await mysql.createConnection({
          host,
          port,
          user: username,
          password,
        });

        try {
          const [databases] = await connection.query(
            `SHOW DATABASES LIKE '${databaseName}'`,
          );

          if ((databases as any).length === 0) {
            await connection.query(`CREATE DATABASE \`${databaseName}\``);
          }

          await connection.end();
        } catch (error) {
          console.error('Error checking/creating MySQL database:', error);
          throw error;
        }
      };

      if (dialect === 'postgres') {
        await checkAndCreatePostgresDB();
      } else if (dialect === 'mysql') {
        await checkAndCreateMySQLDB();
      } else {
        throw new Error(`Unsupported dialect: ${dialect}`);
      }

      const sequelize = new Sequelize({
        dialect,
        host,
        port,
        username,
        password,
        database: databaseName,
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
