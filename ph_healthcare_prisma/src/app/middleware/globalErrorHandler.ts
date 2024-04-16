import { NextFunction, Request, Response } from "express";
import { sendRes } from "../../shared/sendResponse";
import httpStatus from "http-status";
import { Prisma } from "@prisma/client";

export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode:number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something happen wrong";
    let error = err
    // format prisma error
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = "Validation error"
        error = err.message
    }else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = "Duplicate key error"
            error = err.meta
            
        }
    }

    sendRes(res,{
        statusCode,
        success,
        message,
        data:null,
        error,
    })
}