import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { adminRouter } from '../modules/admin/admin.router';
import { authRouter } from '../modules/auth/auth.routes';
import { specialitiesRouter } from '../modules/specialities/specialities.route';
import { doctorRouter } from '../modules/doctor/doctor.route';
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
        route: doctorRouter
    },
];

moduleRoutes.forEach(routeEl=>{
    v1ModuleRouter.use(routeEl.path,routeEl.route)
})