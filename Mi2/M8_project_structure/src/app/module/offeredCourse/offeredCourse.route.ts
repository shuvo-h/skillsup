import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';
export const offeredCourseRouter = express.Router();

offeredCourseRouter.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferCourseValidationSchema),
  OfferedCourseController.createOfferCourse,
);
offeredCourseRouter.get('/', OfferedCourseController.getAllOfferCourse);

offeredCourseRouter.get('/:id', OfferedCourseController.getSingleOfferCourse);
offeredCourseRouter.delete('/:id', OfferedCourseController.deleteOfferCourse);
offeredCourseRouter.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferCourseValidationSchema),
  OfferedCourseController.updateOfferCourse,
);
