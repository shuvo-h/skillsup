import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { OfferCourseService } from './offeredCourse.service';

const createOfferCourse = catchAsync(async (req, res) => {
  const result = await OfferCourseService.createOfferCourseIntoDB(req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course created succesfull',
    data: result,
  });
});

const getSingleOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferCourseService.getSingleOfferCourseFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered retrived created succesfull',
    data: result,
  });
});

const updateOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferCourseService.updateOfferCourseIntoDB(id, req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course updated succesfull',
    data: result,
  });
});

const getAllOfferCourse = catchAsync(async (req, res) => {
  const result = await OfferCourseService.getAllOfferCoursesFromDB(req.query);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course created succesfull',
    data: result,
  });
});
const deleteOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferCourseService.deleteOfferCourseFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course deleted succesfull',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferCourse,
  getSingleOfferCourse,
  updateOfferCourse,
  getAllOfferCourse,
  deleteOfferCourse,
};
