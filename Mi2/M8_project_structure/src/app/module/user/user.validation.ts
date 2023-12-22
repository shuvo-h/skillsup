import { z } from 'zod';
import { UserStatus } from './user.constant';

const userZodValidationSchema = z.object({
  // id: z.string(), // auto generated
  password: z
    .string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password is required',
    })
    .max(20, { message: 'maximim 20 characters allowed' })
    .optional(),
  // needsPassword: z.boolean().optional().default(true),     // will be set from model
  // role: z.enum(['admin', 'student', 'faculty']),   // set from endpoint controller
  // status: z.enum(['in-progress', 'blocked']).default('in-progress'),   // will be set from endpoint controller
  // isDeleted: z.boolean().optional().default(false)     // will be set from model
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...Object.values(UserStatus)] as [string, ...string[]]),
  }),
});

export const userValidations = {
  userZodValidationSchema,
  changeStatusValidationSchema,
};
