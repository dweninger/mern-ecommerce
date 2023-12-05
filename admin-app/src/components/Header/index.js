import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions';

/**
* @author
* @function Header
**/

export const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>Logout</span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (<Nav>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link">Register</NavLink>
      </li>
    </Nav>);
  }

  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary" data-bs-theme="dark" style={{ zIndex: 1 }}>
      <Container fluid>
        <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default Header;