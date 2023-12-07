import express from 'express';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AdminRoutes } from '../module/admin/admin.route';
import { CourseRoutes } from '../module/courses/course.route';
import { FacultyRoutes } from '../module/faculty/faculty.route';
import { StudentRoute } from '../module/student/student.route';
import { userRouter } from '../module/user/user.route';

export const PrimaryRouter = express.Router();

const moduleRoutes = [
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
];

moduleRoutes.forEach((routerEl) =>
  PrimaryRouter.use(routerEl.path, routerEl.route),
);
