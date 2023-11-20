import { Request, Response } from "express";
import { userService } from "../services/user.service";

const createUser = async function (req:Request, res:Response) {
    try {
        const userData = req.body;
        const result = await userService.createuser(userData);

        res.status(200).json({
            status: "success",
            message:"User created successfully",
            data: result,
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message || 'Something went wrong'
        })
        
    }
}
const getAllUser = async function (req:Request, res:Response) {
    try {
        const result = await userService.getAllUser();

        res.status(200).json({
            status: "success",
            message:"User retrived successfully",
            data: result,
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message || 'Something went wrong'
        })
        
    }
}
const getSingleUser = async function (req:Request, res:Response) {
    try {
        const id = req.params.id;
        const result = await userService.getSingleUser(id);

        res.status(200).json({
            status: "success",
            message:"User retrived successfully",
            data: result,
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message || 'Something went wrong'
        })
        
    }
}
const updateUser = async function (req:Request, res:Response) {
    try {
        const id = req.params.id;
        const userData = req.body;
        const result = await userService.updateUser(id,userData);

        res.status(201).json({
            status: "success",
            message:"User updated successfully",
            data: result,
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message || 'Something went wrong'
        })
        
    }
}
const deleteUser = async function (req:Request, res:Response) {
    try {
        const id = req.params.id;
         await userService.deleteUser(id);

        res.status(200).json({
            status: "success",
            message:"User deleted successfully",
            data: null,
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message || 'Something went wrong'
        })
        
    }
}

export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
}