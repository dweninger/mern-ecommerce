import React from 'react';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaUser, FaShoppingCart} from 'react-icons/fa';

/**
 * @author
 * @function Header
 */

const Header = (props) => {
  return (
    <div className="header">
      <div className="search-container">
        <Form>
          <InputGroup>
            <Form.Group>
              <Form.Control
                placeholder='Search'
              />
            </Form.Group>
            <Button variant="outline-secondary" className="search-icon">
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
      </div>

      <a className="logo-url" href='/'><img className="logo-img" src={generatePublicUrl('tt-logo.png')} /></a>

      <div className="">
        <Button variant="light" className="header-button cart-button">
          <FaShoppingCart/>
          <span className="button-text"> Cart</span>
        </Button>
        <Button variant="light" className="header-button account-button">
          <FaUser/>
          <span className="button-text">  Account</span>
        </Button>
      </div>
    </div>
  )

}

export default Header