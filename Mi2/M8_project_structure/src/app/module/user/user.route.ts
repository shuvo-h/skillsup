import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';

export const userRouter = express.Router();

userRouter.post(
  '/create-student',
  authCheck(USER_ROLE.admin),
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);

userRouter.post(
  '/create-faculty',
  authCheck(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

userRouter.post(
  '/create-admin',
  // authCheck(USER_ROLE.admin), // need to be super_admin
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);
