import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Navbar} from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="bg-nav">
      <Container>
        <Link to="/"><Navbar.Brand>Home</Navbar.Brand></Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/login"><Navbar.Text>Login</Navbar.Text></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;