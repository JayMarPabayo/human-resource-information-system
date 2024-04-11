import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BsEnvelope, BsLock } from 'react-icons/bs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement your login logic
    console.log('Login clicked with email:', email, 'and password:', password);
  };

  return (
    <Container style={{ width: '30rem' }}>
      <Row className="bg-secondary bg-opacity-50 px-3 rounded shadow-lg" style={{ paddingBlock: '6rem' }}>
        <Col>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <BsEnvelope />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <BsLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Form.Group>
            <Button variant="dark" type="submit" className='w-full py-3'>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
