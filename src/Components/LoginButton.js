import React, { useState } from 'react';
import { Button, Form, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5001";

const LoginButton = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
            
            setIsLoggedIn(true);
            setUser(data.user);
            setUsername('');
            setPassword('');
            setShowModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignUp = () => {
        setShowModal(false);
        navigate('/signup');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    if (isLoggedIn && user) {
        return (
            <div className="d-flex align-items-center">
                <span className="me-3">Welcome, {user.full_name}</span>
                <Button variant="outline-primary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Login
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">
                                Login
                            </Button>
                            <Button variant="outline-primary" onClick={handleSignUp}>
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginButton;
