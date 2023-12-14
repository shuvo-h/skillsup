import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constatnt';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string({
        invalid_type_error: 'Invalid Academic Id type',
        required_error: 'Academic Id is required',
      })
      .refine((value) => /^[a-f\d]{24}$/i.test(value), {
        message: 'Invalid Academic Id type',
      }),

    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]], {
      invalid_type_error: 'Invalid status type',
      required_error: 'Status is required',
    }),

    startDate: z
      .string({
        invalid_type_error: 'Invalid date format',
        required_error: 'Start Date is required',
      })
      .datetime({ message: 'Must be a date' }),

    endDate: z
      .string({
        invalid_type_error: 'Invalid date format',
        required_error: 'End Date is required',
      })
      .datetime({ message: 'Must be a date' }),

    minCredit: z
      .number({
        invalid_type_error: 'Invalid number format',
        required_error: 'MinCredit is required',
      })
      .min(0, { message: 'Credit cannot be negative' }),

    maxCredit: z
      .number({
        invalid_type_error: 'Invalid number format',
        required_error: 'MaxCredit is required',
      })
      .min(0, { message: 'Credit cannot be negative' }),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string({
        invalid_type_error: 'Invalid Academic Id type',
        required_error: 'Academic Id is required',
      })
      .refine((value) => /^[a-f\d]{24}$/i.test(value), {
        message: 'Invalid Academic Id type',
      })
      .optional(),

    status: z
      .enum([...SemesterRegistrationStatus] as [string, ...string[]], {
        invalid_type_error: 'Invalid status type',
        required_error: 'Status is required',
      })
      .optional(),

    startDate: z
      .string({
        invalid_type_error: 'Invalid date format',
        required_error: 'Start Date is required',
      })
      .datetime({ message: 'Must be a date' })
      .optional(),

    endDate: z
      .string({
        invalid_type_error: 'Invalid date format',
        required_error: 'End Date is required',
      })
      .datetime({ message: 'Must be a date' })
      .optional(),

    minCredit: z
      .number({
        invalid_type_error: 'Invalid number format',
        required_error: 'MinCredit is required',
      })
      .min(0, { message: 'Credit cannot be negative' })
      .optional(),

    maxCredit: z
      .number({
        invalid_type_error: 'Invalid number format',
        required_error: 'MaxCredit is required',
      })
      .min(0, { message: 'Credit cannot be negative' })
      .optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
