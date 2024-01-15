import express from 'express';
import { todoControllers } from './todoController';

export const todoRouter = express.Router();

todoRouter.post("/",todoControllers.createMultipleTodo)
todoRouter.get("/",todoControllers.getTodos)
todoRouter.post("/todo",todoControllers.createTodo)
todoRouter.put("/todo/:id",todoControllers.updateTodo)