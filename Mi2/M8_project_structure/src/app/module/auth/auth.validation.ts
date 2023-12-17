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

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
