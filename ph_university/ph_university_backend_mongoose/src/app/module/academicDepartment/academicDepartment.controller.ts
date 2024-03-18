import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created successfully',
      data: result,
    });
  },
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic departments are fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
        departmentId,
      );

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is fetched successfully',
      data: result,
    });
  },
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );

    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is updated successfully',
      data: result,
    });
  },
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
