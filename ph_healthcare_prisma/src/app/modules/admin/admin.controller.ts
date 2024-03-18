import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";


const getAdmin  = async(req:Request,res:Response) =>{
    try {
        
        const filters = pick(req.query,adminFilterableFields);
        const options = pick(req.query,['page','limit','sortBy','sortOrder']);
        const result = await adminServices.getAdminFromDb(filters as any,options as any)
        res.status(200).json({
            success: true,
            message: "Admins retrived successfully",
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


export const adminControllers = {
    getAdmin,
}