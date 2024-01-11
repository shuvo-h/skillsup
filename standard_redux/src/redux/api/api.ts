import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://dummyjson.com/todos
export type TodoDummyItem = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

type TodoDummyItemList = {todos:TodoDummyItem[]};


  

const myBaseUrl = "https://dummyjson.com";
export const dummyJsonApi = createApi({
    reducerPath: "dummyJsonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: myBaseUrl,

    }),
    endpoints: (builder) =>{
        return {
            getDummyAllTodo: builder.query<TodoDummyItemList,string>({
                query: () =>({
                    url: "/todos?limit=100",
                    method: "GET",
                    // params:""
                })
            }),
            getDummyTodoById: builder.query<TodoDummyItemList,string>({
                query: (todo_id) =>`todos/${todo_id}`
            }),
        };
    }
})