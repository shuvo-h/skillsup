import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catchAsync';
import { testSurgeryModel } from './testTreatmentSchema';

const createSetgery = async (req:Request, res:Response) => {
  const result = await testSurgeryModel.insertMany(req.body);
  res.json(result);
};

export const surgeryControllers = {
  createSetgery: catchAsync(createSetgery),
};
