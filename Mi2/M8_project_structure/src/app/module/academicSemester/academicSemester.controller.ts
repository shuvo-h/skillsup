import httpStatus from 'http-status';
import { sendRes } from '../../utils/sendRes';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res): Promise<void> => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
