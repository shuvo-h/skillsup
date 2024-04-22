import { TBlog } from '@/types';
import React from 'react';
import LatestBlogCard from '../ui/LatestBlogCard';
import BlogCard from '../ui/BlogCard';

type TLatestBlogsProps = {
    blogs: TBlog[]
}

const LatestBlogs = ({blogs}:TLatestBlogsProps) => {

    return (
        <div className='w-[90%] mx-auto'>
            <h1 className='text-4xl text-center'>Latest Blogs from <span className='text-accent'>Blogiz</span></h1>
            <p className='text-xl text-center text-gray-400 w-2/4 mx-auto'><i>Welcome to Blogiz, your go-to source for all things related to blogging. Our mission is to provide you with the latest and most insightful articles to help you succeed in the world of blogging!</i></p>
            <div className='grid grid-cols-2 gap-4 my-5'>
                {
                    blogs.slice(0,2).map(blog => <LatestBlogCard blog={blog}  key={blog.id} />)
                }
            </div>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    blogs.slice(2,5).map(blog => <BlogCard blog={blog}  key={blog.id} />)
                }
            </div>
        </div>
    );
};

export default LatestBlogs;
