import { sendRes } from './../../../shared/sendResponse';
import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from '../../../shared/catchAsync';
import { ScheduleService } from './schedule.sevice';
import { pick } from '../../../shared/pick';

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query,['startDate','endDate'])
    const options = pick(req.query,['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await ScheduleService.getAllFromDB(filters,options,req.user);

    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedules retrived successfully!",
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.getByIdFromDB(id);
    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule retrieval successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.deleteFromDB(id);
    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule deleted successfully',
        data: result,
    });
});

export const ScheduleController = {
    inserIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB
};