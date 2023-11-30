import express from 'express';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { StudentRoute } from '../module/student/student.route';
import { userRouter } from '../module/user/user.route';

export const PrimaryRouter = express.Router();

const moduleRoutes = [
  { path: '/users', route: userRouter },
  { path: '/students', route: StudentRoute },
  { path: '/academic-semesters', route: AcademicSemesterRoute },
  { path: '/academic-faculties', route: AcademicFacultyRoute },
  { path: '/academic-departments', route: AcademicDepartmentRoute },
];

moduleRoutes.forEach((routerEl) =>
  PrimaryRouter.use(routerEl.path, routerEl.route),
);
