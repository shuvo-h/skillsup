import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendRes } from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { adminServices } from "./admin.service";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await adminServices.getAllFromDb(
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
  getAllFromDB: catchAsync(getAllFromDB),
  getByAdminId: catchAsync(getByAdminId),
  updateByAdminId: catchAsync(updateByAdminId),
  deleteByAdminId: catchAsync(deleteByAdminId),
  softDeleteFromDb: catchAsync(softDeleteFromDb),
};
