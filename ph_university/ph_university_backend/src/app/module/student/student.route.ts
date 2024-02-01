import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { StudentController } from './student.controller';
import { studentValidation } from './student.zod.validation';

const router = express.Router();

router.get('/',authCheck(USER_ROLE.admin, USER_ROLE['super-admin'],USER_ROLE.faculty), StudentController.getAllStudents);
router.get(
  '/:id',
  authCheck(USER_ROLE.admin, USER_ROLE['super-admin'],USER_ROLE.faculty),
  StudentController.getSingleStudent,
);
router.delete('/:id',authCheck(USER_ROLE.admin, USER_ROLE['super-admin']), StudentController.deleteSingleStudent);
router.patch(
  '/:id',
  authCheck(USER_ROLE.admin, USER_ROLE['super-admin']),
  validateRequest(studentValidation.updateStudentZodValidationSchema),
  StudentController.updateSingleStudent,
);

export const StudentRoute = router;
