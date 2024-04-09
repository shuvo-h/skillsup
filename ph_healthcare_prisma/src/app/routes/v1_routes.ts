
import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { adminRouter } from '../modules/admin/admin.router';
import { authRouter } from '../modules/auth/auth.routes';
import { specialitiesRouter } from '../modules/specialities/specialities.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { PatientRoutes } from '../modules/Patient/patient.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';
import { doctorScheduleRouter } from '../modules/doctorSchedule/doctorSchedule.route';
import { AppointmentRoutes } from '../modules/appointment/appointment.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
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
    {
        path: '/appointment',
        route: AppointmentRoutes
    },
    {
        path: '/payment',
        route: PaymentRoutes
    },
    /*
    {
        path: '/prescription',
        route: PrescriptionRoutes
    },
    {
        path: '/review',
        route: ReviewRoutes
    },
    {
        path: '/meta',
        route: MetaRoutes
    }
    */
];

moduleRoutes.forEach(routeEl=>{
    v1ModuleRouter.use(routeEl.path,routeEl.route)
})