import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { sendRes } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await adminServices.getAdminFromDb(
    filters as any,
    options as any
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins retrived successfully",
    meta: result.meta,
    data: result.data,
  });
};

const getByAdminId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await adminServices.getByIdFromDb(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins retrived successfully by id",
    meta: null,
    data: result,
  });
};

const updateByAdminId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
    console.log(id);
    
  const result = await adminServices.updateByIdIntoDb(id, req.body);

  sendRes(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "Admin updated successfully by id",
    meta: null,
    data: result,
  });
};
const deleteByAdminId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await adminServices.deleteByIdFromDb(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully by id",
    meta: null,
    data: result,
  });
};
const softDeleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await adminServices.softDeleteFromDb(id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin soft deleted successfully by id",
    meta: null,
    data: result,
  });
};

export const adminControllers = {
  getAdmin: catchAsync(getAdmin),
  getByAdminId: catchAsync(getByAdminId),
  updateByAdminId: catchAsync(updateByAdminId),
  deleteByAdminId: catchAsync(deleteByAdminId),
  softDeleteFromDb: catchAsync(softDeleteFromDb),
};
