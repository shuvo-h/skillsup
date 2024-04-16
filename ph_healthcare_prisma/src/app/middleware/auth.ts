import { NextFunction, Request, Response } from "express";
import { env } from "../../config/config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { UserRole } from "@prisma/client";

export type TDecodeuser = {
    email: string,
    role: UserRole,
    iat: number,
    exp: number
  }
// attach the user property with Request object
declare global {
    namespace Express {
      interface Request {
        user?: TDecodeuser;
      }
    }
}

 export const auth = (...roles:string[]) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED,"Token is required");
            }
            const decodeduser = jwtHelpers.verifyToken(token,env.JWT_SECRET as string) as TDecodeuser;
            // console.log(decodeduser);
            
            if (roles.length && !roles.includes(decodeduser.role)) {
                throw new ApiError(httpStatus.FORBIDDEN,"You are not permitted to access this resource");
            }
            
            req.user = decodeduser;
            next()
        } catch (error) {
            next(error)
            
        }
    }
}
