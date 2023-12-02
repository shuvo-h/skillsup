/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { isDevelopment } from '../config/config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSource } from '../interface/error.interface';
/**
 * 
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 * @returns {
  success,
    message,
    errorSource:[
      path: "",
      message: ""
    ],
    stack
  }
 */


  
export const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong.';

  
  let errorSources:TErrorSource[] = [{path:"",message}];


  

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    
    
  }else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    
    
  
  }else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    
    
  
  }else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [{path:'',message: err?.message}];
    
    
  
  }else if (err instanceof Error) {
    message = err?.message;
    errorSources = [{path:'',message: err?.message}];
    
    
  }

  return res.status(statusCode).json({
    success: false,
    message,
    // error: err,
    errorSources,
    stack: isDevelopment ?  err?.stack : null,
  });
};
