import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { courseServuces } from './course.services';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServuces.createCourseIntoDB(req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServuces.getSingleCourseFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServuces.getAllCoursesFromDB(req.query);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved succesfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServuces.updateCourseIntoDB(id, req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated succesfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServuces.deleteCourseFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted succesfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServuces.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is assigned succesfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServuces.removeFacultiesWithCourseFromDB(
    courseId,
    faculties,
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is removed succesfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
