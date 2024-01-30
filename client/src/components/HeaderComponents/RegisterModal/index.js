import React from 'react';
import './style.css';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

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
                <Form className="register-form">
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="First name" className="register-input" />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Last name" className="register-input" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Email" className="register-input" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Create password" className="register-input" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Confirm password" className="register-input" />
                        </Col>
                    </Row>
                </Form>
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
