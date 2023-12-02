import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { studentValidation } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteSingleStudent);
router.patch('/:studentId', validateRequest(studentValidation.updateStudentZodValidationSchema),StudentController.updateSingleStudent);

export const StudentRoute = router;
