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

  
  export const AuthControllers = {
    loginUser,
  };
  