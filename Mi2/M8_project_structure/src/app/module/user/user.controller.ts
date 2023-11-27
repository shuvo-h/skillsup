import httpStatus from 'http-status';

import { sendRes } from '../../utils/sendRes';
import { UserService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res): Promise<void> => {
  const { password, student } = req.body;

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
  const result = await UserService.createStudentIntoDB(password, student);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
