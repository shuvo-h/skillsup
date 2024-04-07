import express from 'express';
import { DoctorSchedulController } from './doctorSchedule.controller';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

export const doctorScheduleRouter = express.Router();

doctorScheduleRouter.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    DoctorSchedulController.getAllFromDB
);

doctorScheduleRouter.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    DoctorSchedulController.getMySchedule
);
doctorScheduleRouter.post(
    '/',
    auth(UserRole.DOCTOR),
    DoctorSchedulController.insertIntoDB
);
doctorScheduleRouter.delete(
    '/:id',
    auth(UserRole.DOCTOR),
    DoctorSchedulController.deleteFromDb
);