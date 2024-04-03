import { sendRes } from './../../../shared/sendResponse';
import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from '../../../shared/catchAsync';
import { ScheduleService } from './schedule.sevice';

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});


export const ScheduleController = {
    inserIntoDB
};