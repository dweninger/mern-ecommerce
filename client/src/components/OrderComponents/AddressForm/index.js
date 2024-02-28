import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './style.css';

const AddressForm = ({
  fullName,
  address,
  address2,
  city,
  state,
  zip,
  country,
  setFullName,
  setAddress,
  setAddress2,
  setCity,
  setState,
  setZip,
  setCountry,
}) => {
  return (
    <Form>
      <Row className="address-row">
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="Full Name"
              className="add-address-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="address-row">
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="Address"
              className="add-address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="address-row">
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="Address Line 2"
              className="add-address-input"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="address-row">
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="City"
              className="add-address-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="Zip/Postal"
              className="add-address-input"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="address-row">
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="State"
              className="add-address-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              as="select"
              className="add-address-input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default AddressForm;
