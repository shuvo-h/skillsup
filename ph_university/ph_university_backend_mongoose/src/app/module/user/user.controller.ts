import httpStatus from 'http-status';

import { sendRes } from '../../utils/sendRes';
import { UserService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res): Promise<void> => {
  const { password, student } = req.body;
  const profileImgFile = req.file;
  
  
  // zod validation
  //   const zodParsedData = studentZodValidationSchema.parse(student);

  //  joi validation
  //   const { value: joiStudent, error: joiErr } = studentJoiValidationSchema.validate(student);

  //   if (joiErr) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'something went wrong',
  //       error: joiErr.details,
  //       originalData: joiStudent,
  //     });
  //   }

  // const result = await studentService.createStudentIntoDB(joiStudent);
  const result = await UserService.createStudentIntoDB(
    password,
    student,
    profileImgFile,
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData,req.file);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData,req.file);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  
  const result = await UserService.getMe(userId, role);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrived succesfully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatusIntoDb(id, req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
const createQrCode = catchAsync(async (req, res) => {

  const result = await UserService.createUserQrCode(req.user);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QR Code is generated succesfully',
    data: result,
  });
});
const decodeQrCode = catchAsync(async (req, res) => {
  console.log(req.body,req.file);
  
  const { imageData } = req.body;
  const result = await UserService.decodeUserQrCode(imageData);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QR Code is decoded succesfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
  createQrCode,
  decodeQrCode,
};
