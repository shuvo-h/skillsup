import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { userRouter } from "./app/modules/user/user.routes";
import { adminRouter } from "./app/modules/admin/admin.router";
import { v1ModuleRouter } from "./app/routes/v1_routes";
import { sendRes } from "./shared/sendResponse";
import httpStatus from "http-status";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFoundHandler } from "./app/middleware/notFoundHandler";
import cookieParser from 'cookie-parser';
import "./config/config"
import cron from 'node-cron';
import { AppointmentService } from "./app/modules/appointment/appointment.service";

export const app: Application = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  try {
      // currently commenting the method call 
      // AppointmentService.cancelUnpaidAppointments();
  } catch (error) {
    console.log(error);
  }
});

// app.use("/api/v1/user",userRouter)
// app.use("/api/v1/admin",adminRouter)
app.use('/api/v1',v1ModuleRouter)

app.get("/",(req:Request,res:Response)=>{
    res.json({
        Okay: "Ok"
    })
})


app.use(notFoundHandler)
app.use(globalErrorHandler)