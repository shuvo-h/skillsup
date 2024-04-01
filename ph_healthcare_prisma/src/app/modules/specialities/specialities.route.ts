import express, { NextFunction, Request, Response } from 'express';
import { specialitiesController } from './specialities.controller';
import { fileUploader } from '../../../helpers/uploader';
import { specialitiesValidator } from './specialities.validation';


export const specialitiesRouter = express.Router();


specialitiesRouter.post(
  "/",
  fileUploader.upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
  req.body = specialitiesValidator.create.parse(JSON.parse(req.body.data));
  // req.body = JSON.parse(req.body.data);
  return specialitiesController.insertIntoDb(req,res,next);
})
