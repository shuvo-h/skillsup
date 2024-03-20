import express, { NextFunction, Request, Response } from 'express';
import { adminControllers } from './admin.controller';
import { adminValidators } from './admin.Validator';
import { AnyZodObject, z } from 'zod';
import { validateRequest } from '../../middleware/validateRequest';


export const adminRouter = express.Router();


adminRouter.get("/",adminControllers.getAdmin)
adminRouter.get("/:id",adminControllers.getByAdminId)
adminRouter.patch("/:id",validateRequest(adminValidators.updateAdminValidator),adminControllers.updateByAdminId)
adminRouter.delete("/:id",adminControllers.deleteByAdminId)
adminRouter.delete("/soft/:id",adminControllers.softDeleteFromDb)
