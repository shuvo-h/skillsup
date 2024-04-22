import LoadingCard from '@/components/ui/LoadingCard';
import { TBlog } from '@/types';
import React from 'react';

const LoadingPage = async() => {
    const res = await fetch('http://localhost:5000/blogs',{
        cache: "no-store",
    })
    const blogs = await res.json();

    return (
        <div>
            <h1 className='text-4xl text-center text-red-500'>Loading..........</h1>

            <div className='grid grid-cols-3 gap-4'>
                {
                    blogs.map((blog:TBlog)=><LoadingCard  key={blog.id} />)
                }
            </div>
        </div>
    );
};

export default LoadingPage;