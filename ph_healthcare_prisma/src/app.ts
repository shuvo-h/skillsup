import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { userRouter } from "./app/modules/user/user.routes";
import { adminRouter } from "./app/modules/admin/admin.router";

export const app: Application = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)

app.get("/",(req:Request,res:Response)=>{
    res.json({
        Okay: "Ok"
    })
})


