import express from 'express';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AdminRoutes } from '../module/admin/admin.route';
import { authRouter } from '../module/auth/auth.route';
import { CourseRoutes } from '../module/courses/course.route';
import { FacultyRoutes } from '../module/faculty/faculty.route';
import { offeredCourseRouter } from '../module/offeredCourse/offeredCourse.route';
import { semesterReegistrationRouter } from '../module/semesterRegistration/semesterRegistration.route';
import { StudentRoute } from '../module/student/student.route';
import { userRouter } from '../module/user/user.route';
import { testRouter } from '../module/queryTest/testModels/testRouter';
import { enrolledCourseRouter } from '../module/enrolledCourse/enrolledCourse.route';

export const PrimaryRouter = express.Router();

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  { path: '/users', route: userRouter },
  { path: '/students', route: StudentRoute },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  { path: '/courses', route: CourseRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/academic-faculties', route: AcademicFacultyRoute },
  { path: '/academic-departments', route: AcademicDepartmentRoute },
  { path: '/semester-registrations', route: semesterReegistrationRouter },
  { path: '/offered-courses', route: offeredCourseRouter },
  { path: '/enrolled-courses', route: enrolledCourseRouter },
  { path: '/test', route: testRouter },
];

moduleRoutes.forEach((routerEl) =>
  PrimaryRouter.use(routerEl.path, routerEl.route),
);
