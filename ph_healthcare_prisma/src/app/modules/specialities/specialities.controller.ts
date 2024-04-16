import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendRes } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { specialitiesService } from "./specialities.services";



const getAllFromDB: RequestHandler = async (req, res, next) => {
 
  
  const result = await specialitiesService.getAllFromDB();
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Specialties data fetched successfully",
  });
};

const insertIntoDb: RequestHandler = async (req, res, next) => {
  
  const result = await specialitiesService.insertIntoDb(req);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Specialties created successfully",
  });
};
const deleteFromDB : RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await specialitiesService.deleteFromDB(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Specialties created successfully",
  });
};

export const specialitiesController = {
  getAllFromDB: catchAsync(getAllFromDB),
  insertIntoDb: catchAsync(insertIntoDb),
  deleteFromDB: catchAsync(deleteFromDB),
};
