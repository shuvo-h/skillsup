import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/:facultyId', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:facultyId', FacultyControllers.deleteFaculty);

router.get('/', authCheck(),FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
