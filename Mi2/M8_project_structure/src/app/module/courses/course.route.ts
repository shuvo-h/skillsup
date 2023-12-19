import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CourseControllers } from './course.controller';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  authCheck(USER_ROLE.admin),
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/:id', authCheck(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  authCheck(USER_ROLE.admin),
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/:id',authCheck(USER_ROLE.admin), CourseControllers.deleteCourse);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
