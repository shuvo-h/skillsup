
import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { adminRouter } from '../modules/admin/admin.router';
import { authRouter } from '../modules/auth/auth.routes';
import { specialitiesRouter } from '../modules/specialities/specialities.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { PatientRoutes } from '../modules/Patient/patient.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';
import { doctorScheduleRouter } from '../modules/doctorSchedule/doctorSchedule.route';
export const v1ModuleRouter = express.Router();

const moduleRoutes = [
    {
        path:"/auth",
        route: authRouter
    },
    {
        path:"/user",
        route: userRouter
    },
    {
        path:"/admin",
        route: adminRouter
    },
    {
        path:"/specialties",
        route: specialitiesRouter
    },
    {
        path:"/doctor",
        route: DoctorRoutes
    },
    {
        path:"/patient",
        route: PatientRoutes
    },
    {
        path:"/schedule",
        route: ScheduleRoutes
    },
    {
        path:"/doctor-schedule",
        route: doctorScheduleRouter
    },
];

moduleRoutes.forEach(routeEl=>{
    v1ModuleRouter.use(routeEl.path,routeEl.route)
})