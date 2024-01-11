import React from "react";
import { Button } from "../ui/button";
import { TTodo, removeTodo, toggleTodoComplete } from "@/redux/features/todoSlice";
import { useAppDispatch } from "@/redux/storeHook";

type TTodoProps = {
  todo: TTodo
}

const TodoCard = ({todo}:TTodoProps) => {
  const dispatch = useAppDispatch();
  const toggleComplete = () =>{
    console.log("clicked");
    dispatch(toggleTodoComplete(todo.id))
  }
  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input onChange={toggleComplete} id="complete" name="complete" type="checkbox"  />
      <p className="font-semibold">{todo.title}</p>
      {/* <p>Time</p> */}
      <p>{todo.description}</p>
      
      <div>
        {
          todo.isCompleted 
          ? <p className="text-green-500">Done</p>
          : <p className="text-red-500">Pending</p>
        }
      </div>
      <div className="space-x-5">
        <Button className="bg-red-500" onClick={()=>dispatch(removeTodo(todo.id))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </Button>
        <Button className="bg-[#5C53FE]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
