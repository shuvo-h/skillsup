import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';
import { sendRes } from '../../utils/sendRes';

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

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudentsFromDB();

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrived successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.getSingleStudentFromDB(studentId);

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.deleteSingleStudentFromDB(studentId);

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
