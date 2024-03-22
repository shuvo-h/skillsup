import express from 'express';
import { userControllers } from './usr.controller';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { env } from '../../../config/config';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

export const userRouter = express.Router();

userRouter.post("/",auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),userControllers.createAdmin)