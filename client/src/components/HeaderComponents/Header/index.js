import React from 'react';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import AccountDropdown from '../AccountDropdown';

const Header = (props) => {
  return (
    <div className="header">
      <Row className="align-items-center justify-content-center">
        <Col>
          <div className="search-container">
            <Form>
              <div className="d-flex">
                <Form.Group>
                  <Form.Control
                    placeholder='Search'
                  />
                </Form.Group>
                <Button variant="outline-secondary" className="search-icon">
                  <FaSearch />
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        <Col>
          <a className="logo-url" href='/'><img className="logo-img" src={generatePublicUrl('tt-logo.png')} /></a>
        </Col>

        <Col>
          <div className="d-flex align-items-center">
            <AccountDropdown />
            <Button href="/cart" variant="light" className="header-button cart-button">
              <FaShoppingCart />
              <span className="button-text"> Cart</span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header;
