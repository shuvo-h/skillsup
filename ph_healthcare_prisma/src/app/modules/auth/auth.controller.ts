
import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync"
import { sendRes } from "../../../shared/sendResponse";
import { authService } from "./auth.service"

const loginUser:RequestHandler = async(req,res,next) =>{
    const {accessToken,refreshToken,data} = await authService.loginUser(req.body);
   
    res.cookie('accessToken',accessToken,{
        secure:  process.env.NODE_ENV === 'development' ? false:true,
        httpOnly: true
    });
    res.cookie('refreshToken',refreshToken,{
        secure:  process.env.NODE_ENV === 'development' ? false:true,
        httpOnly: true
    });
    const {password,...rest} = data;
    sendRes(res,{
        statusCode: 200,
        success: true,
        data:{
            accessToken,
            ...rest
        },
        message:"Loggedin successfully",
    })
}

const refreshToken:RequestHandler = async(req,res,next) =>{
    const {refreshToken} = req.cookies;
    const result = await authService.refreshToken(refreshToken);
   /*
    res.cookie('accessToken',accessToken,{
        secure:  process.env.NODE_ENV === 'development' ? false:true,
        httpOnly: true
    });
    res.cookie('refreshToken',refreshToken,{
        secure:  process.env.NODE_ENV === 'development' ? false:true,
        httpOnly: true
    });
    */
   
    sendRes(res,{
        statusCode: 200,
        success: true,
        data:result,
        message:"Refresh token generated successfully",
    })
}

export const authController = {
    loginUser: catchAsync(loginUser),
    refreshToken: catchAsync(refreshToken),
}