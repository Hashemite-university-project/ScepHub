import { Admins } from 'src/database/entities/admin.entity';
import { Categories } from 'src/database/entities/category.entity';
import { Clients } from 'src/database/entities/client.entity';
import { Contactus } from 'src/database/entities/contact-us.entity';
import { Contents } from 'src/database/entities/course-videos.entity';
import { Courses } from 'src/database/entities/course.entity';
import { Instructors } from 'src/database/entities/instructor.entity';
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
    provide: 'CLIENTS_REPOSITORY',
    useValue: Clients,
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
];
