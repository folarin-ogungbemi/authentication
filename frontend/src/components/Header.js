import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { Container, Navbar} from 'react-bootstrap';
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <Navbar className="bg-nav">
      <Container>
        <Link to="/"><Navbar.Brand>AuthMe</Navbar.Brand></Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/"><Navbar.Text className="p-2">Home</Navbar.Text></Link>
          {user && <Navbar.Text className="p-2">Hello, {user.username}</Navbar.Text>}
          {user ? (<Navbar.Text onClick={logoutUser} className="p-2">Logout</Navbar.Text>) : (<Link to="/login"><Navbar.Text className="p-2">Login</Navbar.Text></Link>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;