import React from 'react'
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Col} from 'react-bootstrap';

const LoginPage = () => {
  return (
    <div>
      <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <h2>Sign In</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>
            <Button as="a" variant="primary">Login</Button>
          </Form>
        </Col>
      </Row>
      </Container>
    </div>
  )
}

export default LoginPage;