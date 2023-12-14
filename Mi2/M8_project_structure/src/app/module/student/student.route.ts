import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { studentValidation } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodValidationSchema),
  StudentController.updateSingleStudent,
);

export const StudentRoute = router;
