import httpStatus from 'http-status';
import { env } from '../../config/config';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { refreshToken, accessToken, needsPasswordChange } =
    await AuthServices.loginUser(req.body);
  res.cookie('refreshToken', refreshToken, {
    secure: env.isProduction,
    httpOnly: true,
    sameSite: "none",
    maxAge: 365 * 24 * 60*60*1000
  });
  res.cookie('accessToken', accessToken, {
    secure: env.isProduction,
    httpOnly: true,
    sameSite: "none",
    maxAge: 365 * 24 * 60*60*1000
  });
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: { accessToken, needsPasswordChange },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePasswordToDB(req.user, req.body);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successful',
    data: result,
  });
});
const createRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { accessToken, needsPasswordChange } =
    await AuthServices.createRefreshTokenByJwt(refreshToken);

  res.cookie('accessToken', accessToken, {
    secure: env.isProduction,
    httpOnly: true,
  });
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access toke is retrived successfully',
    data: { accessToken, needsPasswordChange },
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link is generated successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const resetToken = req.headers.authorization || "";
  const result = await AuthServices.resetPassword(req.body, resetToken);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfull',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  createRefreshToken,
  forgetPassword,
  resetPassword,
};
