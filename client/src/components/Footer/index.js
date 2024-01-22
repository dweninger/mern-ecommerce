import React from 'react';
import './style.css';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import {
    FaRegCopyright,
    FaGooglePay,
    FaPaypal,
    FaCcDiscover,
    FaCcVisa,
    FaCcMastercard,
    FaApplePay,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa"

const Footer = (props) => {

    return (
        <div className="footer-container">
            <div className="footer-top">
                <Row>
                    <Col>
                        <div className="footer-mission footer-section">
                            <h6>Our Mission:</h6>
                            <span>Our mission at Tabletop Treasures is to make tabletop gaming accessible to all, where every player can discover the thrill of tabletop gaming without breaking the bank.</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="footer-categories footer-section">
                            <h6>Shop Categories:</h6>
                            <div className="footer-category-links">
                            <ul>
                                <li><a href="/">Board Games</a></li>
                                <li><a href="/">Miniature Games</a></li>
                                <li><a href="/">Trading Card Games</a></li>
                                <li><a href="/">Role Playing Games</a></li>
                                <li><a href="/">Accessories</a></li>
                                <li><a href="/">Casual Games</a></li>
                            </ul>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="footer-info footer-section">
                            <h6>Info:</h6>
                            <ul>
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Contact Us</a></li>
                                <li><a href="/">FAQ</a></li>
                                <li><a href="/">Shipping Policy</a></li>
                                <li><a href="/">Return Policy</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className="footer-newsletter footer-section">
                            <h6>Newsletter:</h6>
                            <span>Subscribe to get notified about new releases and weekly deals.</span>
                            <Form className="subscribe-form">
                                <InputGroup>
                                    <Form.Group style={{ width: '65%' }}>
                                        <Form.Control
                                            type='email'
                                            placeholder='Email'
                                        />
                                    </Form.Group>
                                    <Button style={{ backgroundColor: '#bf190a', border: 'none' }}>Join</Button>
                                </InputGroup>
                            </Form>

                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-bottom">
                <Row>
                    <Col>
                        <div className="terms-container">
                            <Row>
                                <Col>
                                    <a href="/">Terms of Use</a>
                                    <span className="divider"> | </span>
                                    <a href="/">Privacy Policy</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                            <span className="copyright"><FaRegCopyright /> Tabletop Treasures</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="socials-container">
                            <h6>Follow Us:</h6>
                            <div className="socials-logos">
                                <a href="/"><FaFacebook /> </a>
                                <a href="/"><FaInstagram /> </a>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="payments-container">
                            <h6>We Accept:</h6>
                            <div className="payment-icons">
                                <FaApplePay /> <FaGooglePay /> <FaPaypal /> <FaCcDiscover /> <FaCcVisa /> <FaCcMastercard />
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Footer;
