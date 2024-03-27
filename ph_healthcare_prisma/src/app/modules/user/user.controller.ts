import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { sendRes } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createAdmin  = async(req:Request,res:Response,next:NextFunction) =>{
    const result = await userServices.createAdmin(req)
    sendRes(res,{
        statusCode: httpStatus.CREATED,
        message:"Admin created successfully",
        data: result,
        error: null,
        success:true,
        meta: null
    })
}

const createDoctor  = async(req:Request,res:Response,next:NextFunction) =>{
    const result = await userServices.createDoctor(req)
    sendRes(res,{
        statusCode: httpStatus.CREATED,
        message:"Doctor created successfully",
        data: result,
        error: null,
        success:true,
        meta: null
    })
}


const createPatient  = async(req:Request,res:Response,next:NextFunction) =>{
    const result = await userServices.createPatient(req)
    sendRes(res,{
        statusCode: httpStatus.CREATED,
        message:"Patient created successfully",
        data: result,
        error: null,
        success:true,
        meta: null
    })
}

const getAllFromDB = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await userServices.getAllFromDb(
      filters as any,
      options as any
    );
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users data fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  };
const changeProfileStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {id} = req.params;
    const result = await userServices.changeProfileStatus(id,req.body);
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users profile status changed",
      meta: null,
      data: result,
    });
  };
  

export const userControllers = {
    createAdmin: catchAsync(createAdmin),
    createDoctor: catchAsync(createDoctor),
    createPatient: catchAsync(createPatient),
    getAllFromDB: catchAsync(getAllFromDB),
    changeProfileStatus: catchAsync(changeProfileStatus),
}