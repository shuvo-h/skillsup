import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import { UserController } from './user.controller';

export const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);

userRouter.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

userRouter.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);
