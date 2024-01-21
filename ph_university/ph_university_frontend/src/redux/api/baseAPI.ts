import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
const baseUrl = `http://localhost:5000/api/v1`;
const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include", // add this to request the backend to set cookies on the request header 
    prepareHeaders: (headers,api) =>{
        const {getState} = api;
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization',`${token}`)
        }

        return headers;
    },
})


const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> = async(args,api,extraOptions):Promise<any> =>{
    let result = await baseQuery(args,api,extraOptions);
    
    if (result.error?.status === 401) {
        console.log('sending refreshToken');
        const response = await fetch(`${baseUrl}/auth/refresh-token`,{
            method:"POST",
            credentials:"include",
        }).then(res=>res.json())
        
        // logout user if refreshToken expired
        if (response.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setUser({user,token: response.data.accessToken }))
            
            result = await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logout());
        }

    }
    return result;
}

export const baseAPI = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: ()=>({}),
})