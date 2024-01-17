import React from 'react';
import './style.css';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

/**
 * @author
 * @function LoginModal 
 */

const LoginModal = (props) => {

    return (
        <Modal className="login-modal" size={props.size} show={props.show} onHide={props.handleHide}>
            <Modal.Header className="login-header" closeButton>
                <Modal.Title className="login-title">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="login-group">
                    <Form.Control type="text" placeholder="Email" className="login-input" />
                </Form.Group>

                <Form.Group className="login-group">
                    <Form.Control type="password" placeholder="Password" className="login-input" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <a href="/" className="forgot-password-link">Forgot password?</a>
                <Button variant="primary" className='w-100 mx-5' >
                    Login
                </Button>
            </Modal.Footer>
            <span className="no-account-signup">Don't have an account? <button className="no-account-signup-button">Signup</button></span>
        </Modal>
    )
}

export default LoginModal
