import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/:facultyId',authCheck(USER_ROLE.admin,USER_ROLE['super-admin'],USER_ROLE.faculty), FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  authCheck(USER_ROLE.admin,USER_ROLE['super-admin'],),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:facultyId',authCheck(USER_ROLE.admin,USER_ROLE['super-admin'],), FacultyControllers.deleteFaculty);

router.get(
  '/',
  authCheck(USER_ROLE['super-admin'],USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
