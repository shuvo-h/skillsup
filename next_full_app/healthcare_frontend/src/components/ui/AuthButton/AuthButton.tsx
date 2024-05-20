"use client"
import { getUserInfo, isLoggedIn, removeUser } from '@/services/actions/auth.service';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const AuthButton = () => {
    const userInfo = getUserInfo();
    const isLogin = isLoggedIn();
    const router = useRouter()
    // console.log({isLogin,userInfo});
    const handleLogout = () =>{
        removeUser()
        router.refresh(); // without reload, refresh the page
    }
    return (
        <>
            {
                    isLogin
                    ? <Button onClick={handleLogout} color="error">Logout</Button>
                    :<Button component={Link} href="/login">Login</Button>
                }
        </>
    );
};

export default AuthButton;