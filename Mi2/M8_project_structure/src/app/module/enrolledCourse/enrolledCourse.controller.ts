import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { EnrolledCourseServices } from './enrolledCourse.services';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDb(
    req.user.userId,
    req.body,
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});

const updateEnrolledCourse = catchAsync(async (req, res) => {
    const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseIntoDb(
    facultyId,
    req.body,
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student mark is updated succesfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourse,
};
