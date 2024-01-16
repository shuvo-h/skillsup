import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    );

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is created successfully',
      data: result,
    });
  },
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculties are fetched successfully',
      data: result,
    });
  },
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is fetched successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is updated successfully',
      data: result,
    });
  },
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
