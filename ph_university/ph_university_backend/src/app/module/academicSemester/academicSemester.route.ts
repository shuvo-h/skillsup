import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academic.zod.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import { USER_ROLE } from '../user/user.constant';
import { authCheck } from '../../middlewares/AuthCheck';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/', authCheck(USER_ROLE.admin),AcademicSemesterController.getAllAcademicSemesters);
router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);
export const AcademicSemesterRoute = router;
