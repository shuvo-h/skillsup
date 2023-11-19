import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(20)
    .pattern(new RegExp(/^[A-Za-z\s]+$/))
    .message('First name must be a string with only alphabetic characters'),

    middleName: Joi.string(),

    lastName: Joi.string()
    .required()
    .pattern(new RegExp(/^[A-Za-z\s]+$/))
    .message('Last name must be a string with only alphabetic characters'),
});

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

const localguardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
});

export const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    email: Joi.string().required().email(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localguardianValidationSchema.required(),
    profileImg: Joi.string().required(),
    isActive: Joi.string().valid('active', 'blocked').required(),
});

