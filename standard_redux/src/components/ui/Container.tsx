import React, { ReactNode } from 'react';

type TContainerChildren = {
    children: ReactNode,
}

const Container = ({children}:TContainerChildren) => {
    return (
        <div className='h-screen w-full max-w-7xl mx-auto'>
            {children}
        </div>
    );
};

export default Container;