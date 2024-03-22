import express, { NextFunction, Request, Response } from 'express';
import { adminControllers } from './admin.controller';
import { adminValidators } from './admin.Validator';
import { AnyZodObject, z } from 'zod';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';


export const adminRouter = express.Router();


adminRouter.get("/",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),adminControllers.getAdmin)
adminRouter.get("/:id",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),adminControllers.getByAdminId)
adminRouter.patch("/:id",validateRequest(adminValidators.updateAdminValidator),adminControllers.updateByAdminId)
adminRouter.delete("/:id",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),adminControllers.deleteByAdminId)
adminRouter.delete("/soft/:id",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),adminControllers.softDeleteFromDb)
