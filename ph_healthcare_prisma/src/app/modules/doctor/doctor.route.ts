import express from 'express';
import { doctorController } from './doctor.controller';

export const doctorRouter = express.Router();


doctorRouter.patch("/:id",doctorController.updateIntoDb)




