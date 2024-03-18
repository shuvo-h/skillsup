import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { EnrolledCourseValidations } from './enrolledCourse.validation';

export const enrolledCourseRouter = express.Router();

enrolledCourseRouter.post(
  '/create-enrolled-course',
  authCheck(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);
enrolledCourseRouter.patch(
  '/update-enrolled-course-marks',
  authCheck(USER_ROLE['super-admin'],USER_ROLE.admin,USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourse,
);
