import React, { useState } from 'react';
import NavigationBar from '../Components/NavigationBar.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './pageStyles.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSignUp = () => {
    console.log("email", email);
    console.log("user", username);
    console.log("pass", password);
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <div className="Signup">
        <NavigationBar />
        <Container fluid className="d-flex p-0" style={{ height: '100vh'}}>
          <Row className="w-100">
            <Col md={4} className="p-5 bg-secondary text-white">
              <h3>Sign Up</h3>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" className="mt-3" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </Form>
            </Col>
            <Col className="d-flex justify-content-center align-items-center bg-dark text-white">
              <h1>Food Blog</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Signup;
