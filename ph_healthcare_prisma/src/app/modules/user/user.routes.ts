import express from 'express';
import { userControllers } from './usr.controller';

export const userRouter = express.Router();

userRouter.post("/",userControllers.createAdmin)