import React from 'react';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaShoppingCart} from 'react-icons/fa';
import AccountDropdown from '../AccountDropdown';

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
            <Form.Group style={{width: '75%'}}>
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

      <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <AccountDropdown />
        <Button variant="light" className="header-button cart-button">
          <FaShoppingCart/>
          <span className="button-text"> Cart</span>
        </Button>
      </div>
    </div>
  )

}

export default Header