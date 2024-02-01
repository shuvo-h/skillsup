import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.validation';
import { authCheck } from '../../middlewares/AuthCheck';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  authCheck(USER_ROLE['super-admin'],USER_ROLE.admin),
  validateRequest(
    academicFacultyZodValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyZodValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);
export const AcademicFacultyRoute = router;
