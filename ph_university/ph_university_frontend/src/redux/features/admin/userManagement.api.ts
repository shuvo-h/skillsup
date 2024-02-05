import { TQueryParams, TResponseRedux, TStudent } from "../../../types";
import { baseAPI } from "../../api/baseAPI";

export const userManagementAPI = baseAPI.injectEndpoints({
    endpoints: (builder) =>({
        
        getAllStudents: builder.query({
            query: (args) =>{
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item:TQueryParams) =>{
                        params.append(item.name,String(item.value));
                    })
                }
                // params.append('name','Fall')
                return {
                    url: '/students',
                    method: "GET",
                    params,
                }
            },
            
            transformResponse:(res:TResponseRedux<TStudent[]>) =>{
                return {
                    data: res.data,
                    meta: res.meta,
                } 
            }
            
        }),
        
        addStudent: builder.mutation({
            query: (bodyFormData) =>{
                console.log(Object.fromEntries(bodyFormData));
                
                return {
                    url: '/users/create-student',
                    method: "POST",
                    body:bodyFormData,
                }
            },
        }),
    })
})