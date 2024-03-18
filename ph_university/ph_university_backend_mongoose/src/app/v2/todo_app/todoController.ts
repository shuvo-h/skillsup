import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { TodoModel } from "./todoModel"
import { sendRes } from "../../utils/sendRes";
import httpStatus from "http-status";

const createMultipleTodo = async(req:Request,res:Response) =>{
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todosWithIds = req.body.map((todo:any) => ({
        ...todo,
        id: `${timestamp}-${randomString}`,
        isCompleted: false,
    }));

    console.log(todosWithIds);
    

    const result = await TodoModel.insertMany(todosWithIds);
    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Todoes are created',
        data: result,
      });
}
const createTodo = async(req:Request,res:Response) =>{
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    const result = await TodoModel.create({...req.body,id: `${timestamp}-${randomString}`,isCompleted: false,});
    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Todoe is created',
        data: result,
      });
}

const getTodos = async(req:Request,res:Response) =>{
    const page = parseInt(req.query?.page as string) || 1; 
    const limit = parseInt(req.query?.limit as string) || 10; 

    const query = {} as Record<string,unknown>;
    if (req.query.priority) {
        query.priority = req.query.priority;
    }

    try {
        const total = await TodoModel.countDocuments(query);
        const result = await TodoModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        const response = {
            meta: {
                page,
                limit,
                total,
            },
            todos: result,
        };
        sendRes(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Todoes are retrived',
            data: response,
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        sendRes(res, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: true,
            message: error.message || 'Failed to Todoes retrived',
            data: [],
        });
        
    }
 
}

const updateTodo = async(req:Request,res:Response) =>{
    const id = req.params.id;
    const todo = req.body;
    const filter = {_id:id};
    const updateDoc = {
        $set:{
            isCompleted: todo.isCompleted,
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
        }
    }
    const result = await TodoModel.updateOne(
        filter,
        updateDoc,
        {upsert:true},
    )
    
    sendRes(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Todoe is updated',
        data: result,
      });
}



export const todoControllers = {
    createTodo: catchAsync(createTodo),
    createMultipleTodo: catchAsync(createMultipleTodo),
    getTodos: catchAsync(getTodos),
    updateTodo: catchAsync(updateTodo),
}