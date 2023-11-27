import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import { UserController } from './user.controller';

export const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);
