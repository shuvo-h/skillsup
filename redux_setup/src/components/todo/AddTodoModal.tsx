
import React, { FormEvent, useState } from 'react';
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { useAppDispatch } from '@/redux/storeHook';
// import { addTodo } from '@/redux/features/todoSlice';
import { dummyJsonApi } from '@/redux/api/api';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';


const AddTodoModal = () => {
    // const dispatch = useAppDispatch();
    const [task,setTask] = useState("");
    const [description,setDescription] = useState("");
    const [priority,setPriority] = useState("medium");
    // const [actualFnForPost,{data,isLoading,isError}] = dummyJsonApi.useAddTodoMutation()
    const [addTodoMutation,{isLoading,isError,isSuccess,data:creadedTodo}] = dummyJsonApi.useAddTodoMutation()
    console.log({isLoading,isError,isSuccess,creadedTodo});

    
    const onSubmit = (e:FormEvent) =>{
        e.preventDefault();
        const id = Math.random().toString(36).substring(2,7);
        console.log({task,description});
        const newTodo = {_id:"",id:id.toString(),title:task,description,priority, isCompleted:false}
        // to update redux
        // dispatch(addTodo({id,title:task,description}))
        console.log(newTodo);
        
        // to create using RTK query mutation
        addTodoMutation(newTodo);
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
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                Priority
                </Label>
                <Select onValueChange={(value)=>setPriority(value)}>
                <SelectTrigger className=" col-span-3">
                    <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="high">high</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">low</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
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