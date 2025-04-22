import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";

function LoginButton() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("user", username);
        console.log("pass", password);
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <DropdownButton 
            variant="secondary" 
            id="dropdown-basic-button" 
            title={<BsFillPersonFill />} 
            align="end" 
            className="no-arrow-dropdown"
        >
            <div className="p-3" style={{ width: '250px' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="mt-3 text-center">
                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </Form>
                <div className="mt-3 text-center">
                    <Button variant="primary" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </DropdownButton>
    );
}

export default LoginButton;
