// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await axios.post('http://localhost:8080/auth/register', { email, password });
            } else {
                await axios.post('http://localhost:8080/auth/login', { email, password });
                onLoginSuccess(); // Call login success function
            }
            console.log('Success');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{isSignUp ? 'Sign Up' : 'Login'}</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {isSignUp && (
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                )}

                                <Button variant="primary" type="submit">
                                    {isSignUp ? 'Sign Up' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <small>
                                {isSignUp ? (
                                    <span>Already have an account? <Button variant="link" onClick={toggleSignUp}>Login</Button></span>
                                ) : (
                                    <span>Don't have an account yet? <Button variant="link" onClick={toggleSignUp}>Sign Up</Button></span>
                                )}
                            </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
