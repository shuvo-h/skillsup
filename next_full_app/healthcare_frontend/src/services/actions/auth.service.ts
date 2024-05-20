import { AUTH_KEY } from "@/constant/authKey"
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodeToken } from "@/utils/jwt";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/localStorage"

export const storeUserInfo = ({accessToken}:{accessToken:string}) =>{
    return setToLocalStorage(AUTH_KEY,accessToken);
}
export const getUserInfo = () =>{
    const accessToken = getFromLocalStorage(AUTH_KEY);
    console.log({accessToken});
    if (accessToken) {
        const decodedUser:any = decodeToken(accessToken);
        return {
            ...decodedUser,
            role: decodedUser?.role?.toLowerCase(),
        }
    }
}
export const isLoggedIn = () =>{
    const accessToken = getFromLocalStorage(AUTH_KEY);
    console.log({accessToken});
    if (accessToken) {
        return !!accessToken
    }
}
export const removeUser = () =>{
    return removeFromLocalStorage(AUTH_KEY);
    
}

export const getNewAccessToken = async () => {
    return await axiosInstance({
        withCredentials: true,
       url: 'http://localhost:5000/api/v1/auth/refresh-token',
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
    });
 };