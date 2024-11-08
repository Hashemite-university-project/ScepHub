import { Admins } from 'src/database/entities/admin.entity';
import { Categories } from 'src/database/entities/category.entity';
import { Contactus } from 'src/database/entities/contact-us.entity';
import { Contents } from 'src/database/entities/course-videos.entity';
import { Courses } from 'src/database/entities/course.entity';
import { Enrollments } from 'src/database/entities/enrollment.entity';
import { Instructors } from 'src/database/entities/instructor.entity';
import { Messages } from 'src/database/entities/message.entity';
import { Payments } from 'src/database/entities/payment.entity';
import { ProjectParticipants } from 'src/database/entities/Project-Participants.entity';
import { Projects } from 'src/database/entities/project.entity';
import { Ratings } from 'src/database/entities/rate.entity';
import { Students } from 'src/database/entities/student.entity';
import { Users } from 'src/database/entities/user.entity';

export const modelsProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: Users,
  },
  {
    provide: 'STUDENT_REPOSITORY',
    useValue: Students,
  },
  {
    provide: 'INSTRUCTOR_REPOSITORY',
    useValue: Instructors,
  },
  {
    provide: 'ADMIN_REPOSITORY',
    useValue: Admins,
  },
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: Categories,
  },
  {
    provide: 'COURSE_REPOSITORY',
    useValue: Courses,
  },
  {
    provide: 'CONTACTUS_REPOSITORY',
    useValue: Contactus,
  },
  {
    provide: 'CONTENT_REPOSITORY',
    useValue: Contents,
  },
  {
    provide: 'PROJECTS_REPOSITORY',
    useValue: Projects,
  },
  {
    provide: 'PAYMENTS',
    useValue: Payments,
  },
  {
    provide: 'PROJECTPARTICIPANTS',
    useValue: ProjectParticipants,
  },
  {
    provide: 'ENROLLMENTS',
    useValue: Enrollments,
  },
  {
    provide: 'RATINGS',
    useValue: Ratings,
  },
  {
    provide: 'MESSAGES',
    useValue: Messages,
  },
];
