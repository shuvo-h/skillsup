'use client'
import { assets } from '@/assets/assetImages';
import PHForm from '@/components/Forms/PHForm';
import PHInputField from '@/components/Forms/PHInputField';
import { storeUserInfo } from '@/services/actions/auth.service';
import {  registerPatientServerAction } from '@/services/actions/registerPatient';
import { userLoginServerAction } from '@/services/actions/userLogin';
import { modifyPayload } from '@/utils/modifyPayload';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { toast } from 'sonner';
import { z } from 'zod';


const registrationValidationSchema = z.object({
    patient: z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
        contactNumber: z.string({ required_error: "Contact number is required" }).regex(/^\d{11}$/,"Invalid contact number"),
        address: z.string({ required_error: "Address is required" }),
    }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must have at least 6 characters" }),
});

const RegisterPage = () => {
    const router = useRouter()
   
      const handleRegister = async(values:FieldValues) => {
        const data = modifyPayload(values);
        // console.log(data);
        try {
            const res = await registerPatientServerAction(data);
            // console.log(res);
            if (res.success) {
                const userLOginfo = await userLoginServerAction({email:values.patient.email,password:values.password});
                
                if (userLOginfo.success) {
                    toast.success(userLOginfo.message)
                    storeUserInfo({accessToken:userLOginfo.data?.accessToken})
                    router.push("/dashboard")
                }
            }
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
            
        }
        
      }
      const defaultValues = {
        patient: {
            name: "",
            email: "",
            contactNumber: "",
            address: ""
        },
        password: ""
    };

    return (
        <Container>
            <Stack sx={{justifyContent:"center",alignItems:"center",height:"100vh"}}>
                <Box sx={{maxWidth:600,width:'100%',boxShadow:1,borderRadious:1,p:4,textAlign:"center"}}>
                <Stack sx={{justifyContent:"center",alignItems:"center"}}>
                    <Box>
                        <Image src={assets.svgs.logo} alt='' />
                    </Box>
                    <Box>
                        <Typography variant='h6' fontWeight={600}>Patient Register</Typography>
                    </Box>
                </Stack>
                <Box>
                    <PHForm onSubmit={handleRegister} resolver={zodResolver(registrationValidationSchema)} defaultValues={defaultValues}>
                        <Grid container spacing={2} my={2}>
                            <Grid item md={12}>
                                <PHInputField 
                                    name="patient.name"
                                    label="Name"
                                    fullWidth={true}
                                    
                                />
                            </Grid>
                            <Grid item md={6}>
                                <PHInputField 
                                    name="patient.email"
                                    label="Email"
                                    fullWidth={true}
                                    
                                />
                            </Grid>
                            <Grid item md={6}>
                                <PHInputField 
                                    name="password"
                                    label="Password"
                                    type="password"
                                    
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <PHInputField 
                                    name="patient.contactNumber"
                                    label="Contact Number"
                                    type="tel"
                                    fullWidth={true}
                                    
                                />
                            </Grid>
                            <Grid item md={6}>
                                <PHInputField 
                                    name="patient.address"
                                    label="Address"
                                    fullWidth={true}
                                    
                                />
                            </Grid>
                        </Grid>
                        <Button sx={{margin:"10px 0"}} type='submit' fullWidth={true}>Register</Button>
                        <Typography component='p' fontWeight={300}>Do you already have an account? <Link href={'/login'}>Login</Link></Typography>
                    </PHForm>
                </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;