import { z } from "zod";
import { PrismaClient, Gender, UserStatus } from '@prisma/client';

const createAdmin = z.object({
    password: z.string({required_error:"Password is required"}),
    admin: z.object({
        name: z.string({required_error:"Name is required"}),
        email: z.string({required_error:"Email is required"}),
        contactNumber: z.string({required_error:"Contact number is required"}),
    })
})
const createDoctor = z.object({
    password: z.string({ required_error: "Password is required" }),
    doctor: z.object({
      name: z.string({ required_error: "Name is required" }),
      email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email format" }),
      contactNumber: z.string({ required_error: "Contact number is required" }).refine(value => /^\d{10}$/.test(value), {
        message: "Invalid contact number format",
      }),
      address: z.string().optional(),
      registrationNumber: z.string({ required_error: "Registration number is required" }),
      experience: z.number().int().min(0, { message: "Experience should be a positive number" }),
      gender: z.enum([Gender.FEMALE,Gender.MALE], { invalid_type_error: "Invalid gender value" }),
      appointmentFee: z.number().int().min(0, { message: "Appointment fee should be a positive number" }),
      qualification: z.string({ required_error: "Qualification is required" }),
      currentWorkingPlace: z.string({ required_error: "Current working place is required" }),
      designation: z.string({ required_error: "Designation is required" }),
    }),
  });

  
const createPatient = z.object({
  password: z.string(),
  patient: z.object({
      email: z.string({
          required_error: "Email is required!"
      }).email(),
      name: z.string({
          required_error: "Name is required!"
      }),
      contactNumber: z.string({
          required_error: "Contact number is required!"
      }),
      address: z.string({
          required_error: "Address is required"
      })
  })
});

const updateStatus = z.object({
  body: z.object({
      status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
  })
})


export const userValidationSchema = {
    createAdmin,
    createDoctor,
    createPatient,
    updateStatus
}