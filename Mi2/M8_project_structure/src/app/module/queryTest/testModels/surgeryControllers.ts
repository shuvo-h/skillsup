import { catchAsync } from '../../../utils/catchAsync';
import { testSurgeryModel } from './testTreatmentSchema';

const createSetgery = async (req, res) => {
  const result = await testSurgeryModel.insertMany(req.body);
  res.json(result);
};

export const surgeryControllers = {
  createSetgery: catchAsync(createSetgery),
};
