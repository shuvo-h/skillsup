import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academic.zod.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import { USER_ROLE } from '../user/user.constant';
import { authCheck } from '../../middlewares/AuthCheck';

const router = express.Router();

router.post(
  '/create-academic-semester',
  authCheck(USER_ROLE.admin,USER_ROLE['super-admin']),
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/', authCheck(USER_ROLE.admin,USER_ROLE['super-admin'],USER_ROLE.faculty,USER_ROLE.student),AcademicSemesterController.getAllAcademicSemesters);
router.get(
  '/:semesterId',
  authCheck(USER_ROLE.admin,USER_ROLE['super-admin'],USER_ROLE.faculty,USER_ROLE.student),
  AcademicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  authCheck(USER_ROLE.admin,USER_ROLE['super-admin'],),
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);
export const AcademicSemesterRoute = router;
