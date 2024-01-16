import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
export const semesterReegistrationRouter = express.Router();

semesterReegistrationRouter.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

semesterReegistrationRouter.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
semesterReegistrationRouter.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);
semesterReegistrationRouter.get(
  '/',
  SemesterRegistrationController.getAllSemesterRegistration,
);
