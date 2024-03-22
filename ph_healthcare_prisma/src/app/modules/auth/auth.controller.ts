import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendRes } from "../../../shared/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const loginUser: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken, data } = await authService.loginUser(
    req.body
  );

  res.cookie("accessToken", accessToken, {
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true,
  });
  const { password, ...rest } = data;
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: {
      accessToken,
      ...rest,
    },
    message: "Loggedin successfully",
  });
};

const refreshToken: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Refresh token generated successfully",
  });
};
const changePassword: RequestHandler = async (req, res, next) => {
  const result = await authService.changePassword(
    (req as any).user,
    req.body as any
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Password changed successfully",
  });
};
const forgotPassword: RequestHandler = async (req, res, next) => {
  const result = await authService.forgotPassword(req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Check your email",
  });
};
const resetPassword: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization || "";
    const result = await authService.resetPassword(token,req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Password reset successfully",
  });
};

export const authController = {
  loginUser: catchAsync(loginUser),
  refreshToken: catchAsync(refreshToken),
  changePassword: catchAsync(changePassword),
  forgotPassword: catchAsync(forgotPassword),
  resetPassword: catchAsync(resetPassword),
};
