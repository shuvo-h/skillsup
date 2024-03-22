import { NextFunction, Request, Response } from "express";
import { sendRes } from "../../shared/sendResponse";
import httpStatus from "http-status";

export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    
    sendRes(res,{
        statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: err.message || "Something happen wrong",
        data:null
    })
}