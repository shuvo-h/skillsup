import express, { NextFunction, Request, Response } from 'express';
import { specialitiesController } from './specialities.controller';
import { fileUploader } from '../../../helpers/uploader';
import { specialitiesValidator } from './specialities.validation';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';


export const specialitiesRouter = express.Router();

specialitiesRouter.get(
  '/',
  specialitiesController.getAllFromDB
)

specialitiesRouter.post(
  "/",
  fileUploader.upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
  req.body = specialitiesValidator.create.parse(JSON.parse(req.body.data));
  // req.body = JSON.parse(req.body.data);
  return specialitiesController.insertIntoDb(req,res,next);
})


specialitiesRouter.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  specialitiesController.deleteFromDB
);
