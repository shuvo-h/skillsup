import express from 'express';
import { StudentRoute } from '../module/student/student.route';
import { userRouter } from '../module/user/user.route';

export const PrimaryRouter = express.Router();

const moduleRoutes = [
  { path: '/users', route: userRouter },
  { path: '/students', route: StudentRoute },
];

moduleRoutes.forEach((routerEl) =>
  PrimaryRouter.use(routerEl.path, routerEl.route),
);
