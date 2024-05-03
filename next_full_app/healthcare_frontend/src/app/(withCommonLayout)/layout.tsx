import Navbar from '@/components/shared/Navbar/Navbar';
import Footer from '@/components/shared/footer/Footer';
import { Container } from '@mui/material';
import React from 'react';

type TCommonLayoutProps = {
    children: React.ReactNode
}

const CommonLayout = ({children}:TCommonLayoutProps) => {
    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xl" sx={{ minHeight: '100vh', paddingTop: 4, paddingBottom: 4 }}>
                {children}
            </Container>
            <Footer />
        </>
    );
};

export default CommonLayout;