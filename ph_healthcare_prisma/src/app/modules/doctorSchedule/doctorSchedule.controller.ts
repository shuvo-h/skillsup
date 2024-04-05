import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendRes } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { TDecodeuser } from "../../middleware/auth";
import { pick } from "../../../shared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    
    const result = await DoctorScheduleService.insertIntoDB(req.user as TDecodeuser,req.body);
    sendRes(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Doctor schedule created successfully',
      data: result,
    });
  });
  
  
const getMySchedule = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query,['startDate','endDate','isBooked'])
  const options = pick(req.query,['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await DoctorScheduleService.getMySchedule(filters,options,req.user as TDecodeuser);

  sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedules retrived successfully!",
      data: result
  });
});
  
const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await DoctorScheduleService.deleteFromDb(req.user as TDecodeuser,id);

  sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedule deleted successfully!",
      data: result
  });
});


export const DoctorSchedulController = {
    insertIntoDB,
    getMySchedule,
    deleteFromDb,
}