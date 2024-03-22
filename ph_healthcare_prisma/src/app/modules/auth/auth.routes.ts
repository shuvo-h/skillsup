import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { authValidators } from './auth.validator';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';


export const authRouter = express.Router();


authRouter.post("/login",validateRequest(authValidators.authLoginValidator),authController.loginUser)
authRouter.post("/refresh-token",authController.refreshToken)
authRouter.post("/change-password",auth(UserRole.ADMIN,UserRole.DOCTOR,UserRole.PATIENT,UserRole.SUPER_ADMIN),authController.changePassword)
authRouter.post("/forgot-password",authController.forgotPassword)
authRouter.post("/reset-password",authController.resetPassword)
