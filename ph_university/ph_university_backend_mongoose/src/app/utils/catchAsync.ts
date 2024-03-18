import { NextFunction, Request, RequestHandler, Response } from 'express';

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

// eslint-disable-next-line no-unused-vars
export type TControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const wrapAsync = <T extends Record<string, TControllerFunction>>(
  controllers: T,
) => {
  // eslint-disable-next-line no-unused-vars
  const wrappedControllers: { [k in keyof T]: TControllerFunction } = {} as {
    [k in keyof T]: TControllerFunction;
  };
  for (const key in controllers) {
    const controllerFunction = controllers[key];
    if (typeof controllerFunction === 'function') {
      wrappedControllers[key] = catchAsync(controllerFunction);
    }
  }
  return wrappedControllers;
};
