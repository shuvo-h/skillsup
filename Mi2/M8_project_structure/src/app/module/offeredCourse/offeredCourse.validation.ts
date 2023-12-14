import { z } from 'zod';
import { DAYS } from './offeredCourse.constant';

const createOfferCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z
        .string({
          invalid_type_error:
            'Invalid type for semesterRegistration. Expecting a string',
          required_error: 'semesterRegistration is required',
        })
        .refine((value) => /^[a-f\d]{24}$/i.test(value), {
          message: 'Invalid ObjectId for semesterRegistration',
        }),

      academicFaculty: z
        .string({
          invalid_type_error:
            'Invalid type for academicFaculty. Expecting a string',
          required_error: 'academicFaculty is required',
        })
        .refine((value) => /^[a-f\d]{24}$/i.test(value), {
          message: 'Invalid ObjectId for academicFaculty',
        }),

      academicDepartment: z
        .string({
          invalid_type_error:
            'Invalid type for academicDepartment. Expecting a string',
          required_error: 'academicDepartment is required',
        })
        .refine((value) => /^[a-f\d]{24}$/i.test(value), {
          message: 'Invalid ObjectId for academicDepartment',
        }),

      course: z
        .string({
          invalid_type_error: 'Invalid type for course. Expecting a string',
          required_error: 'course is required',
        })
        .refine((value) => /^[a-f\d]{24}$/i.test(value), {
          message: 'Invalid ObjectId for course',
        }),

      faculty: z
        .string({
          invalid_type_error: 'Invalid type for faculty. Expecting a string',
          required_error: 'faculty is required',
        })
        .refine((value) => /^[a-f\d]{24}$/i.test(value), {
          message: 'Invalid ObjectId for faculty',
        }),

      maxCapacity: z
        .number({
          invalid_type_error:
            'Invalid type for maxCapacity. Expecting a number',
          required_error: 'maxCapacity is required',
        })
        .min(0, { message: 'maxCapacity must be a non-negative number' }),

      section: z
        .number({
          invalid_type_error: 'Invalid type for section. Expecting a number',
          required_error: 'section is required',
        })
        .int()
        .min(1, { message: 'section must be a positive integer' }),

      days: z.array(
        z.enum([...DAYS] as [string, ...string[]], {
          invalid_type_error: `Invalid type for days. Expecting one of: ${DAYS.join(
            ', ',
          )}`,
          required_error: 'days is required',
        }),
      ),

      startTime: z
        .string({
          invalid_type_error: 'Invalid type for startTime. Expecting a string',
          required_error: 'startTime is required',
        })
        .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
          message: 'Invalid startTime format. Use HH:mm',
        }),

      endTime: z
        .string({
          invalid_type_error: 'Invalid type for endTime. Expecting a string',
          required_error: 'endTime is required',
        })
        .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
          message: 'Invalid endTime format. Use HH:mm',
        }),
    })
    .refine(
      (value) => {
        const start = new Date(`1970-01-01T${value.startTime}:00`);
        const end = new Date(`1970-01-01T${value.endTime}:00`);
        return end > start;
      },
      { message: "Start time can't be after end time" },
    ),
});

const updateOfferCourseValidationSchema = z.object({
  body: z.object({
    faculty: z
      .string({
        invalid_type_error: 'Invalid type for faculty. Expecting a string',
        required_error: 'faculty is required',
      })
      .refine((value) => /^[a-f\d]{24}$/i.test(value), {
        message: 'Invalid ObjectId for faculty',
      })
      .optional(),

    maxCapacity: z
      .number({
        invalid_type_error: 'Invalid type for maxCapacity. Expecting a number',
        required_error: 'maxCapacity is required',
      })
      .min(0, { message: 'maxCapacity must be a non-negative number' })
      .optional(),

    days: z
      .array(
        z.enum([...DAYS] as [string, ...string[]], {
          invalid_type_error: `Invalid type for days. Expecting one of: ${DAYS.join(
            ', ',
          )}`,
          required_error: 'days is required',
        }),
      )
      .optional(),

    startTime: z
      .string({
        invalid_type_error: 'Invalid type for startTime. Expecting a string',
        required_error: 'startTime is required',
      })
      .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
        message: 'Invalid startTime format. Use HH:mm',
      })
      .optional(),

    endTime: z
      .string({
        invalid_type_error: 'Invalid type for endTime. Expecting a string',
        required_error: 'endTime is required',
      })
      .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
        message: 'Invalid endTime format. Use HH:mm',
      })
      .optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferCourseValidationSchema,
  updateOfferCourseValidationSchema,
};
