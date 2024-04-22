"use client";
import React from 'react';

const ServerErrorPage = ({error,reset}) => {
    return (
        <div>
            <h1 className='text-center text-red-500 text-4xl my-8'>Custom Error Message: Happen in Server</h1>
            <h1 className='text-center text-red-700 text-4xl my-8'>{error.message}</h1>
            <div className='text-center mx-auto'>
                <button className='border' onClick={()=> reset()}>Try Again</button>
            </div>
        </div>
    );
};

export default ServerErrorPage;