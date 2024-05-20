import { AUTH_KEY } from "@/constant/authKey";
import { getNewAccessToken } from "@/services/actions/auth.service";
import setAccessToken from "@/services/actions/setAccessToken";
import { TMeta, TResponseError, TResponseSuccess } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const axiosInstance = axios.create()
axiosInstance.defaults.headers.post["Content-Type"] = "application/json"
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60*1000; // 1min


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(AUTH_KEY);
    if (accessToken) {
        config.headers.Authorization = accessToken;
        // config.headers["api_access_token"] = accessToken;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  
// Add a response interceptor
// @ts-ignore
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject:TResponseSuccess = {
        data: response?.data?.data,
        meta: response?.data?.meta,
    }
    return responseObject;
    // return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);
    const config = error.config;
    console.log(config);
  
    // const responseObject:TResponseError = {
    //     statusCode: error?.response?.data?.statusCode||500,
    //     message: error?.response?.data?.message||"Unknown error occured ",
    //     errorMessages: error?.response?.data?.errorMessages||[],
    // }

    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers['Authorization'] = accessToken;
      setToLocalStorage(AUTH_KEY, accessToken);
      setAccessToken(accessToken);
      return axiosInstance(config);
   } else {
      const responseObject: TResponseError = {
         statusCode: error?.response?.data?.statusCode || 500,
         message: error?.response?.data?.message || 'Something went wrong!!!',
         errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return responseObject;
   }

    // return Promise.reject(error);
    // return responseObject
  });


export { axiosInstance };