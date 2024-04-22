import FooterForDashboard from '@/components/shared/FooterForDashboard';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div>
            <div className='min-h-screen'>
                {children}
            </div>
            <FooterForDashboard />
        </div>
    );
};

export default DashboardLayout;