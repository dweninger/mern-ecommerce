import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions';

/**
 * @author
 * @function LoginModal 
 */

const LoginModal = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginAttempted, setLoginAttempted] = useState(false);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password,
        }
        setShowLogin(false);
        setLoginAttempted(true);
        dispatch(login(user));
    }

    useEffect(() => {
        if (loginAttempted) {
            if (auth.authenticate) {
                props.handleHide();
            } else if (auth.error) {
                alert("Login credentials incorrect.");
                setLoginAttempted(false);
            }
        }
    }, [auth.authenticate, auth.error]);

    return (
        <Modal className="login-modal" size={props.size} show={props.show} onHide={props.handleHide}>
            <Modal.Header className="login-header" closeButton>
                <Modal.Title className="login-title">{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group className="login-group">
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="login-group">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <a href="/" className="forgot-password-link">Forgot password?</a>
                <Button variant="primary" className='w-100 mx-5' onClick={userLogin}>
                    Login
                </Button>
            </Modal.Footer>
            <span className="no-account-signup">Don't have an account? <button className="no-account-signup-button">Signup</button></span>
        </Modal>
    )
}

export default LoginModal
