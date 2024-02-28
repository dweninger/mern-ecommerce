import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddressForm from '../AddressForm';
import './style.css';

const AddressModal = (props) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any necessary logic for handling the address submission
    props.handleHide();
  };

  return (
    <Modal size={props.size} show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddressForm
          fullName={fullName}
          address={address}
          address2={address2}
          city={city}
          state={state}
          zip={zip}
          country={country}
          setFullName={setFullName}
          setAddress={setAddress}
          setAddress2={setAddress2}
          setCity={setCity}
          setState={setState}
          setZip={setZip}
          setCountry={setCountry}
        />
      </Modal.Body>
      <Modal.Footer className="align-items-center justify-content-center">
        <Button className="add-address-button" onClick={handleSubmit}>
          Add Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
