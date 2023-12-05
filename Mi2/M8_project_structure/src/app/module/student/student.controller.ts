import httpStatus from 'http-status';
import { studentService } from './student.service';
import { sendRes } from '../../utils/sendRes';
import { catchAsync } from '../../utils/catchAsync';

/*
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    // zod validation
    const zodParsedData = studentZodValidationSchema.parse(student);

    //  joi validation
    const { value: joiStudent, error: joiErr } =
      studentJoiValidationSchema.validate(student);

    if (joiErr) {
      return res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: joiErr.details,
        originalData: joiStudent,
      });
    }

    // const result = await studentService.createStudentIntoDB(joiStudent);
    const result = await studentService.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student is created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as { message: string }).message || 'something went wrong',
      data: null,
      error,
    });
  }
};
*/

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentsFromDB(req.query);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrived successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudentFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const {student} = req.body;
  const result = await studentService.updateSingleStudentIntoDB(id,student);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});
const deleteSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.deleteSingleStudentFromDB(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
