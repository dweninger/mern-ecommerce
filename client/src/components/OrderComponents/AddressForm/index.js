import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './style.css';

const AddressForm = ({
  guestAddress, setGuestAddress
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
              value={guestAddress.fullName}
              onChange={(e) => setGuestAddress({...guestAddress, fullName: e.target.value})}
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
              value={guestAddress.addressLine1}
              onChange={(e) => setGuestAddress({...guestAddress, addressLine1: e.target.value})}
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
              value={guestAddress.addressLine2}
              onChange={(e) => setGuestAddress({...guestAddress, addressLine2: e.target.value})}
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
              value={guestAddress.city}
              onChange={(e) => setGuestAddress({...guestAddress, city: e.target.value})}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              type="text"
              placeholder="Zip/Postal"
              className="add-address-input"
              value={guestAddress.zip}
              onChange={(e) => setGuestAddress({...guestAddress, zip: e.target.value})}
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
              value={guestAddress.state}
              onChange={(e) => setGuestAddress({...guestAddress, state: e.target.value})}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="add-address-group">
            <Form.Control
              as="select"
              className="add-address-input"
              value={guestAddress.country}
              onChange={(e) => setGuestAddress({...guestAddress, country: e.target.value})}
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
