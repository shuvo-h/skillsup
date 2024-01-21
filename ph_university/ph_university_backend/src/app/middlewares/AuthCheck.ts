import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/config';
import AppError from '../errors/AppError';
import { TUserRole } from '../module/user/user.interface';
import { UserModel } from '../module/user/user.model';
import { catchAsync } from '../utils/catchAsync';

export const authCheck = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if token sent in header
    if (!token) {
      throw new AppError(httpStatus.FORBIDDEN, `You are not authorized!`);
    }
    let decoded;

    // need extra try catch to handle jwt verify error throw with different status code
    try {
      // check if token is valid
      decoded = jwt.verify(token,env.jwt_access_secret as string,) as JwtPayload;
      if (!decoded) {
        throw new AppError(httpStatus.UNAUTHORIZED, `You are not authorized!`);
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      throw new AppError(httpStatus.UNAUTHORIZED, `${error.message}`);
    }
    const { role, userId, iat } = decoded;

    const user = await UserModel.findOne({ id: userId }).select('+password'); // tell with "+" sign to select password since in schema we have used password:{select:0}; the +sign return doc with other rest of the properties.

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, `User doesn't exist`);
    }
    // check if user is not deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, `User is already deleted`);
    }
    // check if user is not deleted
    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, `User is already blocked`);
    }

    // check if password is not changed after issued the token
    if (user.passwordChangedAt) {
      const isTokenIssuedBeforePasswordChanged =
        UserModel.isJwtIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number,
        );
      if (isTokenIssuedBeforePasswordChanged) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          `Invalid Token, Please login again!`,
        );
      }
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, `You are not permitted`);
    }

    // if get typescript error to add user object with req, then go to "/interface/index.d.ts" file adn add the user property with Express Request namespace
    req.user = decoded as JwtPayload;
    next();

    /*
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
    */
  });
};
