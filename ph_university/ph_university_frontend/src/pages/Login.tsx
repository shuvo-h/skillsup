import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { authApi } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/storeHook';
import { setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utilities/verifyToken';

const Login = () => {
    const dispatch = useAppDispatch();
    const {register,handleSubmit} = useForm({
        defaultValues:{
            userId: "A-0001",
            password:"admin123"
        }
    });
    const [loginMutation,{data,isLoading,error}] = authApi.useLoginMutation();
    console.log({error,isLoading,data});
    
    const onSubmit = async(data) =>{
        const userInfo = {
            id: data.userId,
            password: data.password,
        }
        const response =  await loginMutation(userInfo).unwrap(); // unwrap means only return the response data, not all a=object
       
        const user = verifyToken(response.data.accessToken)
        dispatch(setUser({user,token:response.data.accessToken}))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
           <div>
                <label htmlFor="userId">ID:</label>
                <input {...register('userId')} type="text" id='userId' />
           </div>
           <div>
                <label htmlFor="password">Password:</label>
                <input {...register('password')} type="password" id='password' />
           </div>
           <Button htmlType='submit'>Login</Button>
        </form>
    );
};

export default Login;