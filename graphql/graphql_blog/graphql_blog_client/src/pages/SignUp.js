import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

// Inline CSS styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        boxSizing: 'border-box',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '250px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#218838',
    },
    heading: {
        marginBottom: '20px',
    }
};

const CREATE_USER = gql`
    mutation Mutation($name: String!, $email: String!, $password: String!,$bio:String,) {
        signup(name: $name, email: $email, password: $password,bio: $bio) {
            token
            user {
                email
                id
                name
            }
            userError
        }
    }
`;

const Register = () => {
    // State hooks to manage input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
    console.log(data);
    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Bio:', bio);

        // Execute the mutation to create a user
        createUser({
            variables: {
                name: name,
                email: email,
                password: password,
                bio: bio,
            },
        });
    };

    useEffect(()=>{
        if (data?.signup?.token) {
            localStorage.setItem('token',data?.signup?.token)
        }
    },[data])

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    style={styles.input}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Submit
                </button>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.createUser && (
                    <div>
                        <p>Token: {data.createUser.token}</p>
                        {data.createUser.userError && <p>Error: {data.createUser.userError}</p>}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Register;
