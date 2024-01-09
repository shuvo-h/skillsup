import express, { NextFunction, Request, Response } from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { multer_uploader } from '../../utils/uploadImgToCloudinary';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { userValidations } from './user.validation';

export const userRouter = express.Router();

userRouter.post(
  '/create-student',
  authCheck(USER_ROLE.admin),
  multer_uploader.single('profile_img'),
  (req: Request, res: Response, next: NextFunction) => {
    // after image upload, convert form data from body.data to json and attach with body
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);

userRouter.post(
  '/create-faculty',
  authCheck(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

userRouter.post(
  '/create-admin',
  // authCheck(USER_ROLE.admin), // need to be super_admin
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);
userRouter.post(
  '/change-status/:id',
  authCheck(USER_ROLE.admin),
  validateRequest(userValidations.changeStatusValidationSchema),
  UserController.changeStatus,
);
userRouter.get(
  '/me',
  authCheck(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
);


// get QR code of user
userRouter.get(
  '/me/qr-code',
  authCheck(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.createQrCode,
);
userRouter.post('/me/qr-code',authCheck(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),multer_uploader.single('imageData'),
UserController.decodeQrCode,);
