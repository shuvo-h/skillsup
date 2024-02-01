import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

export const sendRes = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
