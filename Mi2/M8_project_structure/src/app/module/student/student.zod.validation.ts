import validator from 'validator';
import { z } from 'zod';

const userNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must not exceed 20 characters' })
    .refine(
      (value) => {
        const formattedName =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return formattedName === value;
      },
      { message: 'First name must be in capitalized format' },
    ),

  middleName: z.string(),

  lastName: z.string().refine((value) => validator.isAlpha(value), {
    message: 'Last name must be a string with only alphabetic characters',
  }),
});

const guardianZodValidationSchema = z.object({
  fatherName: z
    .string()
    .min(2, { message: "Father's name must be at least 2 characters long" }),
  fatherOccupation: z.string().min(2, {
    message: "Father's occupation must be at least 2 characters long",
  }),
  fatherContactNo: z.string().min(2, {
    message: "Father's contact number must be at least 2 characters long",
  }),
  motherName: z
    .string()
    .min(2, { message: "Mother's name must be at least 2 characters long" }),
  motherOccupation: z.string().min(2, {
    message: "Mother's occupation must be at least 2 characters long",
  }),
  motherContactNo: z.string().min(2, {
    message: "Mother's contact number must be at least 2 characters long",
  }),
});

const localGuardianZodValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Local guardian's name must be at least 2 characters long",
  }),
  occupation: z
    .string()
    .min(2, { message: 'Occupation must be at least 2 characters long' }),
  contactNo: z
    .string()
    .min(2, { message: 'Contact number must be at least 2 characters long' }),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters long' }),
});

export const createStudentZodValidationSchema = z.object({
  body: z
    .object({
      password: z
        .string()
        .min(1, { message: 'Passwordt be at least 1 characters long' })
        .max(20, { message: 'password maximum 20 characters allowed' }),
      student: z.object({
        name: userNameZodValidationSchema,
        email: z.string().email({ message: 'Invalid email format' }),
        gender: z
          .enum(['male', 'female', 'other'])
          .refine((value) => ['male', 'female', 'other'].includes(value), {
            message: 'Invalid value for gender',
          }),
        dateOfBirth: z.string().optional(),
        contactNo: z.string().min(2, {
          message: 'Contact number must be at least 2 characters long',
        }),
        emergencyContactNo: z.string().min(2, {
          message:
            'Emergency contact number must be at least 2 characters long',
        }),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().min(2, {
          message: 'Present address must be at least 2 characters long',
        }),
        permanentAddress: z.string().min(2, {
          message: 'Permanent address must be at least 2 characters long',
        }),
        guardian: guardianZodValidationSchema,
        localGuardian: localGuardianZodValidationSchema,
        admissionSemester: z.string(),
        profileImg: z.string().min(2, {
          message: 'Profile image URL must be at least 2 characters long',
        }),
      }),
    })
    .refine(
      (data) => {
        if (!data) {
          // to prevent ts not used of 'data' error
          return false;
        }
        // Custom refinement for the entire student object if needed
        return true;
      },
      {
        message:
          'Custom validation error message for the entire student object',
        path: ['student'], // Adjust the path as needed
      },
    ),
});

const updateUserNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must not exceed 20 characters' })
    .refine(
      (value) => {
        const formattedName =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return formattedName === value;
      },
      { message: 'First name must be in capitalized format' },
    )
    .optional(),

  middleName: z.string().optional(),

  lastName: z
    .string()
    .refine((value) => validator.isAlpha(value), {
      message: 'Last name must be a string with only alphabetic characters',
    })
    .optional(),
});

const updateGuardianZodValidationSchema = z.object({
  fatherName: z
    .string()
    .min(2, { message: "Father's name must be at least 2 characters long" })
    .optional(),
  fatherOccupation: z
    .string()
    .min(2, {
      message: "Father's occupation must be at least 2 characters long",
    })
    .optional(),
  fatherContactNo: z
    .string()
    .min(2, {
      message: "Father's contact number must be at least 2 characters long",
    })
    .optional(),
  motherName: z
    .string()
    .min(2, { message: "Mother's name must be at least 2 characters long" })
    .optional(),
  motherOccupation: z
    .string()
    .min(2, {
      message: "Mother's occupation must be at least 2 characters long",
    })
    .optional(),
  motherContactNo: z
    .string()
    .min(2, {
      message: "Mother's contact number must be at least 2 characters long",
    })
    .optional(),
});

const updateLocalGuardianZodValidationSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Local guardian's name must be at least 2 characters long",
    })
    .optional(),
  occupation: z
    .string()
    .min(2, { message: 'Occupation must be at least 2 characters long' })
    .optional(),
  contactNo: z
    .string()
    .min(2, { message: 'Contact number must be at least 2 characters long' })
    .optional(),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters long' })
    .optional(),
});

const updateStudentZodValidationSchema = z.object({
  body: z
    .object({
      // password: z.string(),   // move password to update by verification code
      student: z.object({
        name: updateUserNameZodValidationSchema,
        email: z.string().email({ message: 'Invalid email format' }).optional(),
        gender: z
          .enum(['male', 'female', 'other'])
          .refine((value) => ['male', 'female', 'other'].includes(value), {
            message: 'Invalid value for gender',
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        contactNo: z
          .string()
          .min(2, {
            message: 'Contact number must be at least 2 characters long',
          })
          .optional(),
        emergencyContactNo: z
          .string()
          .min(2, {
            message:
              'Emergency contact number must be at least 2 characters long',
          })
          .optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z
          .string()
          .min(2, {
            message: 'Present address must be at least 2 characters long',
          })
          .optional(),
        permanentAddress: z
          .string()
          .min(2, {
            message: 'Permanent address must be at least 2 characters long',
          })
          .optional(),
        guardian: updateGuardianZodValidationSchema.optional(),
        localGuardian: updateLocalGuardianZodValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        profileImg: z
          .string()
          .min(2, {
            message: 'Profile image URL must be at least 2 characters long',
          })
          .optional(),
      }),
    })
    .refine(
      (data) => {
        if (!data) {
          // to prevent ts not used of 'data' error
          return false;
        }
        // Custom refinement for the entire student object if needed
        return true;
      },
      {
        message:
          'Custom validation error message for the entire student object',
        path: ['student'], // Adjust the path as needed
      },
    ),
});

export const studentValidation = {
  createStudentZodValidationSchema,
  updateStudentZodValidationSchema,
};
