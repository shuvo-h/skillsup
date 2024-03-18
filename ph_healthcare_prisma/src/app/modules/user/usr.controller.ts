import { Request, Response } from "express";
import { userServices } from "./usr.service";

const createAdmin  = async(req:Request,res:Response) =>{
    try {
        const result = await userServices.createAdmin(req.body)
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data:result
        });
        
    } catch (error:any) {
        res.status(200).json({
            success: false,
            message: error.message || "Something happen wrong",
            data:null
        });
        
    }
}


export const userControllers = {
    createAdmin,
}