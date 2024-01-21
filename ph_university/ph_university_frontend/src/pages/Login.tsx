import { Button, Row } from 'antd';
import { FieldValues  } from 'react-hook-form';
import { authApi } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/storeHook';
import { TUser, setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utilities/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultFormValue = {
        userId: "A-0001",
        password:"admin123"
    }
    /*
    const {register,handleSubmit} = useForm({
        defaultValues:{
            userId: "A-0001",
            password:"admin123"
        }
    });
    */
   
    const [loginMutation,{data,isLoading,error}] = authApi.useLoginMutation();
    console.log({error,isLoading,data});
    
    const onSubmit = async(data:FieldValues) =>{
        console.log(data);
        
        const toastId = toast.loading('loading to login')
        try {
            const userInfo = {
                id: data.userId,
                password: data.password,
            }
            const response =  await loginMutation(userInfo).unwrap(); // unwrap means only return the response data, not all a=object
           
            const user = verifyToken(response.data.accessToken) as TUser;
            dispatch(setUser({user,token:response.data.accessToken}))
            toast.success('Login successfull',{id:toastId,duration:2000})
            navigate(`/${user.role}/dashboard`)
        } catch (error) {
            console.log(error);
            toast.error('something went wrong',{id:toastId,duration:2000})
        }
    }
    return (
        <Row justify={'center'} align={'middle'} style={{height:'100vh'}} >
            <PHForm onSubmit={onSubmit} defaultValues={defaultFormValue}>
                <PHInput 
                    type='text' 
                    name='userId' 
                    label='ID'
                    // defaultValue='A-0001'
                    id='userId' 
                />
        
                <PHInput 
                    type='password' 
                    name='password' 
                    id='password'
                    // defaultValue='admin123'
                    label='Password'
                />
        
                <Button htmlType='submit'>Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;