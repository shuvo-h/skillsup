import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catchAsync';
import { testTreatmentModel } from './testTreatmentSchema';

const createTreatment = async (req:Request, res:Response) => {
  const result = await testTreatmentModel.insertMany(req.body);
  res.json(result);
};

export const treatmentControllers = {
  createTreatment: catchAsync(createTreatment),
};
