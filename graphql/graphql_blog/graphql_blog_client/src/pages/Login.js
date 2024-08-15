import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    heading: {
        marginBottom: '20px',
    },
    feedback: {
        marginTop: '10px',
        fontSize: '14px',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    }
};

const LOGIN_MUTATION = gql`
    mutation Mutation($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            token
            user {
                id
                email
                createdAt
                name
            }
            userError
        }
    }
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        loginUser({
            variables: {
                email: email,
                password: password,
            },
        });
    };


    useEffect(() => {
        if (data && data.signin) {
            if (data.signin.token) {
                localStorage.setItem('token', data.signin.token);

                navigate('/posts');
            }
        }
    }, [data, ]);

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Login</h2>
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
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Submit
                </button>
                {loading && <p style={styles.feedback}>Loading...</p>}
                {error && <p style={{ ...styles.feedback, ...styles.error }}>Error: {error.message}</p>}
                {data && data.signin && (
                    <div style={styles.feedback}>
                        {data.signin.userError ? (
                            <p style={styles.error}>Error: {data.signin.userError}</p>
                        ) : (
                            <div style={styles.success}>
                                <p>Login successful!</p>
                                <p>Welcome, {data.signin.user.name} ({data.signin.user.email})</p>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
