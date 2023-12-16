import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendRes } from "../../utils/sendRes";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

const changePassword = catchAsync(async (req, res) => {
  console.log(req.user,req.body);
  const result = await AuthServices.changePasswordToDB(req.user,req.body);
    
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successful',
      data: result,
    });
  });

  
  export const AuthControllers = {
    loginUser,
    changePassword,
  };
  