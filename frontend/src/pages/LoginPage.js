import React, {useContext} from 'react'
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Col} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {

  let {loginUser} = useContext(AuthContext)

  return (
    <div>
      <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <h2>Sign In</h2>
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter Password" />
            </Form.Group>
            <Button type='submit' variant="primary">Login</Button>
          </Form>
        </Col>
      </Row>
      </Container>
    </div>
  )
}

export default LoginPage;