import httpStatus from 'http-status';
import { env } from '../../config/config';
import { catchAsync } from '../../utils/catchAsync';
import { sendRes } from '../../utils/sendRes';
import { AuthServices } from './auth.service';


const loginUser = catchAsync(async (req, res) => {
  const {refreshToken,accessToken,needsPasswordChange} = await AuthServices.loginUser(req.body);
  res.cookie('refreshToken',refreshToken,{
    secure: env.isProduction,
    httpOnly: true,
  })
  res.cookie('accessToken',accessToken,{
    secure: env.isProduction,
    httpOnly: true,
  })
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {accessToken,needsPasswordChange},
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
  const {refreshToken} = req.cookies;
  const {accessToken,needsPasswordChange} = await AuthServices.createRefreshTokenByJwt(refreshToken);
  
  res.cookie('accessToken',accessToken,{
    secure: env.isProduction,
    httpOnly: true,
  })
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access toke is retrived successfully',
    data: {accessToken,needsPasswordChange},
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  createRefreshToken,
};
