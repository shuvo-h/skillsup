import Navbar from '@/components/shared/Navbar/Navbar';
import Footer from '@/components/shared/footer/Footer';
import React from 'react';

type TCommonLayoutProps = {
    children: React.ReactNode
}

const CommonLayout = ({children}:TCommonLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default CommonLayout;