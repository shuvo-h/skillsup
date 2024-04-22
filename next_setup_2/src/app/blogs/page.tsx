'use client'
import BlogCard from '@/components/ui/BlogCard';
import { useGetBlogsQuery } from '@/redux/api/baseApi';
import { TBlog } from '@/types';
import React from 'react';

const BlogsPage = () => {
    /*
    // only for server component, currently testing RTK & redux
    const res = await fetch('http://localhost:5000/blogs',{
        cache: "no-store",
    })
    const blogs = await res.json();
  */

  const {data:blogs,isLoading,isError,error} = useGetBlogsQuery(undefined)
  console.log(blogs);
  

    return (
        <div className='w-[90%] mx-auto'>
            <h1 className='text-4xl text-center'>All Blogs from <span className='text-accent'>Blogiz</span></h1>
            <p className='text-xl text-center text-gray-400 w-2/4 mx-auto'><i>Welcome to Blogiz, your go-to source for all things related to blogging. Our mission is to provide you with the latest and most insightful articles to help you succeed in the world of blogging!</i></p>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    blogs?.map((blog:TBlog) => <BlogCard blog={blog}  key={blog.id} />)
                }
            </div>
        </div>
    );
};

export default BlogsPage;