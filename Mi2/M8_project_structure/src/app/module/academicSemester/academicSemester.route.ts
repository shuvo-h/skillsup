import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academic.zod.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
// router.get('/', StudentController.getAllStudents);
// router.get('/:studentId', StudentController.getSingleStudent);
// router.delete('/:studentId', StudentController.deleteSingleStudent);

export const AcademicSemesterRoute = router;
