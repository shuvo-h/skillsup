import { catchAsync } from '../../../utils/catchAsync';
import { TestPatientModel } from './testPatients';

const createPatient = async (req, res) => {
  const result = await TestPatientModel.insertMany(req.body);
  res.json(result);
};

export const patientControllers = {
  createPatient: catchAsync(createPatient),
};
