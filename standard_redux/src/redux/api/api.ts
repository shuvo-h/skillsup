import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTodo } from "../features/todoSlice";
// https://dummyjson.com/todos


type TodoListRes = {
    data: {
        todos:TTodo[],
        meta: {
            page: number,
            limit: number,
            total: number,
        }
    }
};
type CreateTotoRes = {
    data: TTodo,

};


  
const todoBaseUrl = `http://localhost:5000/api/v2`;
export const dummyJsonApi = createApi({
    reducerPath: "dummyJsonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: todoBaseUrl,
    }),
    tagTypes:['todo'], // tag is the name of the cache data. all cached data will be stored with this name. when you will say invalidate "todo", it will clear the cache under this name. using the tags, invalidate the data of providator
    endpoints: (builder) =>{
        return {
            getDummyAllTodo: builder.query<TodoListRes,{priority:string,page?:number,limit?:number}>({
                query: ({priority,page=1,limit=10}) =>{
                    const urlSearchParams = new URLSearchParams();
                    if(priority) urlSearchParams.append('priority',priority);
                    if(page) urlSearchParams.append('page',page.toString());
                    if(limit) urlSearchParams.append('limit',limit.toString());
                        console.log(urlSearchParams,priority);
                        
                    return {
                        url: `/todos`,
                        method: "GET",
                        params: urlSearchParams
                    }
                },
                providesTags: ['todo'], // tagtype will be given in this provider to keep the cache
            }),
            addTodo: builder.mutation<CreateTotoRes,TTodo>({
                query: (bodyData) =>{
                    return {
                        url: "/todos/todo",
                        method: "POST",
                        // params:"",
                        body: bodyData
                    }
                },
                invalidatesTags: ['todo'], // tell here not to keep the cache of this 'todo' name. There will be a relation between invalidatesTags & providesTags. When the invalidatesTags will call 'todo', it will look for the providesTags with the name name 'todo' adn then remove the cache and call the api again so the cache will not be used and new fetched data will be stored as cache again
            }),
            updateTodo: builder.mutation<CreateTotoRes,{_id:string,bodyData:TTodo}>({
                query: (optionData) =>{
                    return {
                        url: `/todos/todo/${optionData._id}`,
                        method: "PUT",
                        // params:"",
                        body: optionData.bodyData,
                    }
                },
                invalidatesTags: ['todo'], 
            }),
            getDummyTodoById: builder.query<TodoListRes,string>({
                query: (todo_id) =>`todos/${todo_id}`
            }),
        };
    }
})