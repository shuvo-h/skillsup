import { NextFunction, Request, Response } from "express"
import { sendRes } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { DoctorSrvice } from "./doctor.service";
import { catchAsync } from "../../../shared/catchAsync";

const updateIntoDb = async (req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    const result = await DoctorSrvice.updateIntoDB(id,req.body)
    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Updated  successfully",
      });
}


export const doctorController = {
    updateIntoDb: catchAsync(updateIntoDb),
};
  