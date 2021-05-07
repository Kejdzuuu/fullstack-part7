import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const padding = {
    padding: 5
  }

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user.name ?
                `logged in as ${user.name}` :
                `logged in as ${user.username}`
              }
            </Nav.Link>
            <Button onClick={logoutHandler}>logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}

export default NavigationBar
