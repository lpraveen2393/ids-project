// /src/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmail, signInWithGoogle, checkUserInDatabase, addUserToDatabase } from '../firebase.js';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmail(email, password);
            const userExists = await checkUserInDatabase(user);
            if (userExists) {
                alert('Login successful!');
            } else {
                alert('User not found in database.');
            }
        } catch (error) {
            alert('Error logging in: ' + error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            const userExists = await checkUserInDatabase(user);
            if (userExists) {
                alert('Google Sign-In successful!');
            } else {
                await addUserToDatabase(user);
                alert('Google Sign-In successful! User added to database.');
            }
        } catch (error) {
            alert('Error with Google Sign-In: ' + error.message);
        }
    };

    return (
        <Container>
            <Content>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <Button type="submit">Login</Button>
                    <SignUpLink to="/signup">Sign Up</SignUpLink>
                </Form>
                <GoogleButton onClick={handleGoogleSignIn}>
                    Sign up with Google
                </GoogleButton>
            </Content>
        </Container>
    );
};

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GoogleButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignUpLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  margin-top: 10px;
  display: inline-block;
`;
