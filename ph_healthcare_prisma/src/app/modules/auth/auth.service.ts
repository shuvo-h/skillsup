import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { env } from "../../../config/config";
import { Secret } from "jsonwebtoken";
import { emailSender } from "./emailSender";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password incorrect");
  }
  const jsPayload = {
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jsPayload,
    env.JWT_SECRET as string,
    env.EXPIRES_IN as string
  );
  const refreshToken = jwtHelpers.generateToken(
    jsPayload,
    env.REFRESH_TOKEN_SECRET as string,
    env.REFRESH_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
    data: userData,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      env.REFRESH_TOKEN_SECRET as string
    );
  } catch (error) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const jsPayload = {
    email: userData.email,
    role: userData.role,
  };
  const accessToken = jwtHelpers.generateToken(
    jsPayload,
    env.JWT_SECRET as string,
    env.EXPIRES_IN as string
  );
  const { password, ...rest } = userData;
  return {
    accessToken,
    ...jsPayload,
  };
};

const changePassword = async (
  user: { email: string },
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password incorrect");
  }
  const saltRound = 12;
  const hashedPassword: string = await bcrypt.hash(
    payload.newPassword,
    saltRound
  );
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {};
};
const forgotPassword = async (payload:{email:string}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email:payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelpers.generateToken({email:userData.email,role:userData.role},env.RESET_PASSWORD_TOKEN_SECRET as Secret, env.RESET_PASSWORD_TOKEN_EXPIRES_IN as string)

  const resetPasswordLink = `${env.RESEAT_PASSWORD_BASE_URL}?email=${userData.email}&token=${resetPasswordToken}&userId=${userData.id}`;
  const mailTemplate = `
    <div>
        <p>Dear User,</p>
        <p>Your password reset link <a href=${resetPasswordLink}>Reset Password</a></p>
    </div>
  `;
  await emailSender(userData.email,mailTemplate);

  return {resetPasswordLink};
};
const resetPassword = async (token:string,payload:{id:string,password:string}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id:payload.id,
      status: UserStatus.ACTIVE,
    },
  });
  const isValidToken = jwtHelpers.verifyToken(token,env.RESET_PASSWORD_TOKEN_SECRET as string);
  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN,"Invalid token");
  }

  // hash passwoed
  const saltRound = 12;
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    saltRound
  );
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {isPasswordReset: true};
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
