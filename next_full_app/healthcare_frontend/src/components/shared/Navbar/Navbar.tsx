"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";


const Navbar = () => {
   const AuthButton = dynamic(()=>import("@/components/ui/AuthButton/AuthButton"),{ssr:false})
    
    return (
        <Container>
            <Stack py={2} direction={'row'}justifyContent={'space-between'} alignItems={'center'}>
                <Typography 
                    variant="h4" 
                    component={Link} href="/"
                    fontWeight={600}
                >P<Box component={"span"} color={"primary.main"}>H</Box> Health Care</Typography>
                <Stack direction={'row'} gap={4} justifyContent={"space-between"}>
                    <Typography component={Link} href="/consultation">Consultation</Typography>
                    <Typography component={Link} href="/login">Health Plans</Typography>
                    <Typography component={Link} href="/login">Medicine</Typography>
                    <Typography component={Link} href="/login">Diagnostics</Typography>
                    <Typography component={Link} href="/login">NGOs</Typography>
                </Stack>
                {/* {
                    isLogin
                    ? <Button onClick={handleLogout} color="error">Logout</Button>
                    :<Button component={Link} href="/login">Login</Button>
                } */}
                <AuthButton />
            </Stack>
        </Container>
    );
};

export default Navbar;