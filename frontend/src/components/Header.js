import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { Container, Navbar} from 'react-bootstrap';
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {name} = useContext(AuthContext)
  return (
    <Navbar className="bg-nav">
      <Container>
        <Link to="/"><Navbar.Brand>AuthMe</Navbar.Brand></Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/"><Navbar.Text className="p-2">Home</Navbar.Text></Link>
          <Link to="/login"><Navbar.Text className="p-2">{name ? "Hello, " + name : "Login"}</Navbar.Text></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;