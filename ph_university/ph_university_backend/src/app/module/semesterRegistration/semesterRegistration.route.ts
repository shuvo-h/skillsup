import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { authCheck } from '../../middlewares/AuthCheck';
import { USER_ROLE } from '../user/user.constant';
export const semesterReegistrationRouter = express.Router();

semesterReegistrationRouter.post(
  '/create-semester-registration',
  authCheck(USER_ROLE.admin, USER_ROLE['super-admin']),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

semesterReegistrationRouter.get(
  '/:id',
  authCheck(
    USER_ROLE.admin,
    USER_ROLE['super-admin'],
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

semesterReegistrationRouter.patch(
  '/:id',
  authCheck(USER_ROLE.admin, USER_ROLE['super-admin']),
  validateRequest(    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,),
  SemesterRegistrationController.updateSemesterRegistration,
);
semesterReegistrationRouter.delete(
  '/:id',
  authCheck(
    USER_ROLE.admin,
    USER_ROLE['super-admin'],
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.deleteSemesterRegistrationById,
);

semesterReegistrationRouter.get(
  '/',
  authCheck(
    USER_ROLE.admin,
    USER_ROLE['super-admin'],
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getAllSemesterRegistration,
);
