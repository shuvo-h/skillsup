'use client'
import { assets } from '@/assets/assetImages';
import PHForm from '@/components/Forms/PHForm';
import PHInputField from '@/components/Forms/PHInputField';
import { storeUserInfo } from '@/services/actions/auth.service';
import { userLoginServerAction } from '@/services/actions/userLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { toast } from 'sonner';
import { z } from 'zod';

const loginValidationSchema = z.object({
    email: z.string({required_error:"Email is required"}).email("Invalid email"),
    password: z.string({required_error:"Password is required"}).min(6,"Must need 6 characters"),
})
const LoginPage = () => {
    const router = useRouter()
      const handleLogin = async(values:FieldValues) => {
        
        try {
            const res = await userLoginServerAction(values);
            console.log(res);
            if (res.success) {
                toast.success(res.message)
                storeUserInfo({accessToken:res.data?.accessToken})
                router.push("/dashboard")
            }else{
                toast.error(res.message)
            }
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
            
        }
        
      }

      const defaultValues = {
        email: "",
        password: "",
      }

    return (
        <Container>
            <Stack sx={{justifyContent:"center",alignItems:"center",height:"100vh"}}>
                <Box sx={{maxWidth:600,width:'100%',boxShadow:1,borderRadious:1,p:4,textAlign:"center"}}>
                <Stack sx={{justifyContent:"center",alignItems:"center"}}>
                    <Box>
                        <Image src={assets.svgs.logo} alt='' />
                    </Box>
                    <Box>
                        <Typography variant='h6' fontWeight={600}>Login PH HealthCare</Typography>
                    </Box>
                </Stack>
                <Box>
                    <PHForm onSubmit={handleLogin} resolver={zodResolver(loginValidationSchema)} defaultValues={defaultValues}>
                        <Grid container spacing={2} my={2}>
                            <Grid item md={6}>
                                <PHInputField 
                                    name='email'
                                    label="Email"
                                    type='email'
                                    fullWidth={true}
                                    placeholder='eg. ab@example.com'
                                    
                                    />
                            </Grid>
                            <Grid item md={6}>
                                <PHInputField 
                                    name='password'
                                    type='password'
                                    
                                    label="Password"
                                    fullWidth={true}
                                    placeholder='eg. 123456'
                                />
                            </Grid>
                        </Grid>
                        <Typography mb={1} textAlign={'end'} component='p' fontWeight={300}>
                            Forgot Password?
                        </Typography>
                        
                        <Button type='submit' sx={{margin:"10px 0"}} fullWidth={true}>
                            Login
                        </Button>
                        <Typography component='p' fontWeight={300}>Don&apos;t have an account? <Link href={'/register'}>Create Account</Link></Typography>
                    </PHForm>
                </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;