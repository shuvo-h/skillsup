import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendRes } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { specialitiesService } from "./specialities.services";

const insertIntoDb: RequestHandler = async (req, res, next) => {
  console.log("Hitt");
  
  const result = await specialitiesService.insertIntoDb(req);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Specialties created successfully",
  });
};

export const specialitiesController = {
  insertIntoDb: catchAsync(insertIntoDb),
};
