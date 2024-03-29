import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TTodo = {
    _id: string;    
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: string;
}
type TInitialState = {
    todos: TTodo[],
}
const initialState:TInitialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name:" todo",
    initialState,
    reducers:{
        addTodo:(state,action:PayloadAction<TTodo>) =>{
            state.todos.push({...action.payload,isCompleted:false});
        },
        removeTodo:(state,action:PayloadAction<string>) =>{
            state.todos = state.todos.filter(todo=>todo.id !== action.payload);
        },
        toggleTodoComplete:(state,action:PayloadAction<string>) =>{
            const task = state.todos.find(todo=>todo.id === action.payload);
            task!.isCompleted = !task?.isCompleted;
        },
    },
})
export const {addTodo,removeTodo,toggleTodoComplete} = todoSlice.actions;
export default todoSlice.reducer;