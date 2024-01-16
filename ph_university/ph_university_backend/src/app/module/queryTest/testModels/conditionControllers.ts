import { TControllerFunction, wrapAsync } from '../../../utils/catchAsync';
import { testMedicalConditionModel } from './testMedicalCondition';

const createCondition: TControllerFunction = async (req, res) => {
  const result = await testMedicalConditionModel.insertMany(req.body);
  res.json(result);
};

export const conditionControllers = wrapAsync({
  createCondition,
});
