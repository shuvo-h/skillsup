import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/v1`,
        credentials: "include", // add this to request the backend to set cookies on the request header 
    }),
    endpoints: ()=>({}),
})