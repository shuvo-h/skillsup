import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required!',
      invalid_type_error: 'Id must be string',
    }),
    password: z.string({
      required_error: 'password is required!',
      invalid_type_error: 'password must be string',
    }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required!',
      invalid_type_error: 'Old password must be string',
    }),
    newPassword: z.string({
      required_error: 'New password is required!',
      invalid_type_error: 'New password must be string',
    }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      invalid_type_error: 'Refresh token must be string',
      required_error: 'Refresh token is required',
    }),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: 'User id must be string',
      required_error: 'User id is required',
    }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: 'User id must be string',
      required_error: 'User id is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required!',
      invalid_type_error: 'New password must be string',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
