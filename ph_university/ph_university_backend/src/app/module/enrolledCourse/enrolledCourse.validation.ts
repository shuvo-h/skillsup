import { z } from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string({
      invalid_type_error: 'Offered Course id Must be string',
      required_error: 'Offered Course id is required',
    }),
  }),
});
const updateEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
        invalid_type_error: 'semesterRegistration id Must be string',
        required_error: 'semesterRegistration id is required',
      }),
    offeredCourse: z.string({
        invalid_type_error: 'Offered Course id Must be string',
        required_error: 'Offered Course id is required',
      }),
    student:z.string({
        invalid_type_error: 'Offered Course id Must be string',
        required_error: 'Offered Course id is required',
      }),
    courseMarks: z.object({
        classTest1: z.number({
            invalid_type_error: 'Class test1 Must be number',
            required_error: 'Class test1 is required',
          }).optional(),
          midTerm: z.number({
            invalid_type_error: 'midTerm Must be number',
            required_error: 'midTerm is required',
          }).optional(),
          classTest2: z.number({
            invalid_type_error: 'classTest2 Must be number',
            required_error: 'classTest2 is required',
          }).optional(),
          finalTerm: z.number({
            invalid_type_error: 'finalTerm Must be number',
            required_error: 'finalTerm is required',
          }).optional(),
    })
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseValidationZodSchema,
};
