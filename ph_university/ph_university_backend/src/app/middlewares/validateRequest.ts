import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { catchAsync } from '../utils/catchAsync';

export const validateRequest = (zodDataSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await zodDataSchema.parseAsync({ body: req.body, cookies: req.cookies });
    next();
  });
};

/*
export const validateRequest = (zodDataSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // zod validation
      await zodDataSchema.parseAsync({ body: req.body });
      return next();
    } catch (error) {
      next(error);
    }
  };
};
*/
