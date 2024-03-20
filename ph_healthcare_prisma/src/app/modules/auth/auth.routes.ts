import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { authValidators } from './auth.validator';


export const authRouter = express.Router();


authRouter.post("/login",validateRequest(authValidators.authLoginValidator),authController.loginUser)
authRouter.post("/refresh-token",authController.refreshToken)
