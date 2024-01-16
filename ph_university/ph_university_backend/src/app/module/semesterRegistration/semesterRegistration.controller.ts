import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendRes(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration created succesfull',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration retrived succesfull',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration updated succesfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
      req.query,
    );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registrations retrived succesfull',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
};
