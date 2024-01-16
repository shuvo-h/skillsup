import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
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
