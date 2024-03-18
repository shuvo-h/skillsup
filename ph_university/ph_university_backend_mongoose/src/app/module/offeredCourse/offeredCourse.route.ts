import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { authCheck } from '../../middlewares/AuthCheck';
import { USER_ROLE } from '../user/user.constant';
export const offeredCourseRouter = express.Router();

offeredCourseRouter.post(
  '/create-offered-course',
  authCheck(USER_ROLE['super-admin'],USER_ROLE.admin,),
  validateRequest(OfferedCourseValidations.createOfferCourseValidationSchema),
  OfferedCourseController.createOfferCourse,
);

offeredCourseRouter.get('/', authCheck(USER_ROLE['super-admin'],USER_ROLE.admin,USER_ROLE.faculty),OfferedCourseController.getAllOfferCourse);

offeredCourseRouter.get('/my-offered-courses', authCheck(USER_ROLE.student),OfferedCourseController.getMyOfferedCourses);

offeredCourseRouter.get('/:id',authCheck(USER_ROLE['super-admin'],USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student), OfferedCourseController.getSingleOfferCourse);

offeredCourseRouter.delete('/:id', authCheck(USER_ROLE['super-admin'],USER_ROLE.admin,),OfferedCourseController.deleteOfferCourse);

offeredCourseRouter.patch(
  '/:id',
  authCheck(USER_ROLE['super-admin'],USER_ROLE.admin,),
  validateRequest(OfferedCourseValidations.updateOfferCourseValidationSchema),
  OfferedCourseController.updateOfferCourse,
);
