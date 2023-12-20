import { catchAsync } from '../../../utils/catchAsync';
import { testMedicalConditionModel } from './testMedicalCondition';

const createCondition = async (req, res) => {
  const result = await testMedicalConditionModel.insertMany(req.body);
  res.json(result);
};

export const conditionControllers = {
  createCondition: catchAsync(createCondition),
};
