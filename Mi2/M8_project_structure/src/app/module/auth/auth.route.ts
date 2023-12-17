import express from 'express';
import { authCheck } from '../../middlewares/AuthCheck';
import { validateRequest } from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
export const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
authRouter.post(
  '/change-password',
  authCheck(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
