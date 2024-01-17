import React from 'react';
import './style.css';
import { Button, Form, Modal } from 'react-bootstrap';

/**
 * @author
 * @function RegisterModal 
 */

const RegisterModal = (props) => {

    return (
        <Modal className="register-modal" size={props.size} show={props.show} onHide={props.handleHide}>
            <Modal.Header className="register-header" closeButton>
                <Modal.Title className="register-title">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="register-group">
                    <Form.Control type="text" placeholder="Email" className="register-input" />
                </Form.Group>

                <Form.Group className="register-group">
                    <Form.Control type="password" placeholder="Create password" className="register-input" />
                </Form.Group>
                <Form.Group className="register-group">
                    <Form.Control type="password" placeholder="Confirm password" className="register-input" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className='w-100 mx-5' >
                    Signup
                </Button>
            </Modal.Footer>
            <span className="no-account-signup">Already have an account? <button className="no-account-signup-button">Login</button></span>
        </Modal>
    )
}

export default RegisterModal
