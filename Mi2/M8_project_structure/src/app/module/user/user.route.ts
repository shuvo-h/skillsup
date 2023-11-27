import express from 'express';
import { UserController } from './user.controller';

export const userRouter = express.Router();

userRouter.post('/create-student', UserController.createStudent);
