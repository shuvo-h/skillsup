import BlogDetails from '@/components/ui/BlogDetails';
import { TBlog } from '@/types';
import React from 'react';

type TSingleBlogPage = {
    params:{
        blogId: string
    }
}

export const generateStaticParams = async()=>{
    const res = await fetch(`http://localhost:5000/blogs`,)
    const blogs = await res.json();
    const blogIdsToCreateStaticPage = blogs.map((blog:TBlog)=>{
        return {
            blogId: blog.id, // property name 'blogId' must be sate with dynamic param value or the dunamic folder name value 
        }
    })
    // generate first 3 static pages, rest will be SSR
    return blogIdsToCreateStaticPage.slice(0,3)
}

const SingleBlogPage = async({params}:TSingleBlogPage) => {
    const {blogId} = params
    console.log(params);
    
    const res = await fetch(`http://localhost:5000/blogs/${blogId}`,{
        cache:"no-store"
    })
    const blog = await res.json()
    console.log(blog);

    
    return (
        <div>
            <BlogDetails blog={blog} />
        </div>
    );
};

export default SingleBlogPage;