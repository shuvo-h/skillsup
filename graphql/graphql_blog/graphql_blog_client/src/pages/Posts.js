import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';

// Inline CSS styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
    },
    card: {
        backgroundColor: '#fff',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'left',
    },
    title: {
        fontSize: '1.2em',
        marginBottom: '10px',
        color: '#333',
    },
    content: {
        fontSize: '1em',
        color: '#555',
    }
};

const GET_POSTS = gql`
    query getPosts{
        posts{
            title
            content
            createdAt
            author {
                id
                name
            }
        }
    }
`;

const Posts = () => {
    // State to manage the list of posts
    const [posts, setPosts] = useState([]);


    const {loading,data,error} = useQuery(GET_POSTS);
    console.log(data);

    return (
        <div style={styles.container}>
            <h2>Posts</h2>
            <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
                {data?.posts?.map(post => (
                    <div key={post.id} style={styles.card}>
                        <h3 style={styles.title}>{post.title}</h3>
                        <p style={styles.content}>{post.content}</p>
                        <p style={styles.content}>Date {new Date(post.createdAt/1000).toISOString()}</p>
                        <p style={styles.content}>by {post.author.name}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
