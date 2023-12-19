import httpStatus from 'http-status';
import  jwt,{ JwtPayload } from 'jsonwebtoken';
import { env } from '../../config/config';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createJwtToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // check if user exist using static method
  // const user = await UserModel.isUserExistByCustomId(payload.id).select('+password');
  const user = await UserModel.findOne({ id: payload.id }).select('+password'); // tell with "+" sign to select password since in schema we have used {select:0}

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

  // check if the password match
  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Invalid user id or password!`);
  }
  const tokenUser = {
    userId: user.id,
    role: user.role,
  };
  // access granted: accessToken, refreshToken
  
  const accessToken = createJwtToken(tokenUser, env.jwt_access_secret as string,env.jwt_access_token_expire_in as string);
  const refreshToken = createJwtToken(tokenUser, env.jwt_refresh_secret as string,env.jwt_refresh_token_expire_in as string);


  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPassword,
  };
};

const changePasswordToDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // check if user exist using static method
  // const user = await UserModel.isUserExistByCustomId(payload.id).select('+password');
  const user = await UserModel.findOne({ id: userData.userId }).select(
    '+password',
  ); // tell with "+" sign to select password since in schema we have used {select:0}

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

  // check if the password match
  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Invalid user id or password!`);
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(env.BCRYPT_SALT_ROUNDS),
  );

  await UserModel.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPassword: false,
      passwordChangedAt: new Date(),
    },
    { runValidators: true, new: true, upsert: false },
  );
  return null;
};


const createRefreshTokenByJwt = async(refreshToken:string) =>{

// check if token is valid
const decoded = jwt.verify(
  refreshToken,
  env.jwt_refresh_secret as string,
) as JwtPayload;
const {  userId, iat } = decoded;

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


const tokenUser = {
  userId: user.id,
  role: user.role,
};
// access granted: accessToken, refreshToken

const accessToken = createJwtToken(tokenUser, env.jwt_access_secret as string,env.jwt_access_token_expire_in as string);


return {
  accessToken,
  needsPasswordChange: user.needsPassword,
};

}

export const AuthServices = {
  loginUser,
  changePasswordToDB,
  createRefreshTokenByJwt,
};
