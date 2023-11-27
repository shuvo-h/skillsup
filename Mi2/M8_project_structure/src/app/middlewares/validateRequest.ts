import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

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
