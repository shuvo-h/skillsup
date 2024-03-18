import express from 'express';
import { adminControllers } from './admin.controller';


export const adminRouter = express.Router();

adminRouter.get("/",adminControllers.getAdmin)