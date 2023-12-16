import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/config";
import AppError from "../errors/AppError";
import { TUserRole } from "../module/user/user.interface";
import { catchAsync } from "../utils/catchAsync";


export const authCheck = (...requiredRoles:TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if token sent in header
    if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, `You are not authorized!`);
    }
    
    // check if token is valid
    jwt.verify(token,env.jwt_access_secret as string,function(err,decoded){
        
        if (err) {
            throw new AppError(httpStatus.FORBIDDEN, `You are not authorized!`);
            
        }

        if (requiredRoles && !requiredRoles.includes((decoded as JwtPayload).role)) {
            throw new AppError(httpStatus.FORBIDDEN, `You need to be an admin`);
        }
        // if get typescript error to add user object with req, then go to "/interface/index.d.ts" file adn add the user property with Express Request namespace
        req.user = decoded as JwtPayload;
        next();
    })

    
  });
  };
  