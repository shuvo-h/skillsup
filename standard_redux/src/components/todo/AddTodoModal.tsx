
import React, { FormEvent, useState } from 'react';
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useAppDispatch } from '@/redux/storeHook';
import { addTodo } from '@/redux/features/todoSlice';


const AddTodoModal = () => {
    const dispatch = useAppDispatch();
    const [task,setTask] = useState("");
    const [description,setDescription] = useState("");
    const onSubmit = (e:FormEvent) =>{
        e.preventDefault();
        const id = Math.random().toString(36).substring(2,7);
        console.log({task,description});
        dispatch(addTodo({id,title:task,description}))
    }
    return (
        <Dialog>
      <DialogTrigger asChild>
      <Button className='bg-primary-gradient text-xl font-semibold'>Add todo</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
                Add your task what you want to finish.
            </DialogDescription>
            </DialogHeader>
      <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                Task
                </Label>
                <Input onBlur={e=>setTask(e.target.value)} id="task" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                Description
                </Label>
                <Input onBlur={e=>setDescription(e.target.value)}  id="description" className="col-span-3" />
            </div>
            </div>
            <DialogFooter>
            <DialogClose asChild>
            <Button type="submit">Save changes</Button>
           
          </DialogClose>
            </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>

    );
};

export default AddTodoModal;