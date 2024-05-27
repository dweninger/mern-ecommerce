import React, { useEffect, useState } from 'react';
import './style.css';
import { Accordion, Button, Collapse } from 'react-bootstrap';
import Layout from '../../components/Layout';
import LoginModal from '../../components/HeaderComponents/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartItems, getUserAddresses, signout, addAddress, deleteAddress } from '../../actions';
import { FaPlus, FaTrash } from "react-icons/fa";
import CreditCardForm from '../../components/OrderComponents/CreditCardForm';
import AddAddressModal from '../../components/OrderComponents/AddAddressModal';
import AddressForm from '../../components/OrderComponents/AddressForm';
import CheckoutItem from '../../components/OrderComponents/CheckoutItem';

const CheckoutPage = (props) => {
    const user = useSelector(state => state.user);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openLogin, setOpenLogin] = useState(true);
    const [openDelivery, setOpenDelivery] = useState(true);
    const [openPayment, setOpenPayment] = useState(true);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
            dispatch(getUserAddresses());
        }
    }, [auth.authenticate]);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [user.addresses]);

    const userLogout = (e) => {
        dispatch(signout());
        navigate('/');
    }

    const renderLoggedInText = () => {
        return (
            <div className="collapse-text" id="collapse-text-login">
                <span>Logged in as {auth.user.firstName} </span>
                <a className="login-anchor" onClick={userLogout}>Log out</a>
            </div>
        );
    }

    const renderNonLoggedInText = () => {
        return (
            <div className="collapse-text" id="collapse-text-login">
                <input
                    type="text"
                    placeholder="Email"
                    className="form-control contact-email-input"
                />
                <span>Have an account? </span>
                <a className="login-anchor" onClick={() => setOpenLoginModal(true)}>Log in</a>
            </div>
        );
    }

    const delAddress = (index) => {
        dispatch(deleteAddress(index));
    }

    const placeOrderWithCard = () => {

    }

    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        subtotal += cartItems[i].price * cartItems[i].qty;
    }

    return (
        <Layout>
            <div className="checkout-container">
                <div className="checkout-options-container">
                    <div className="collapse-section">
                        <Button
                            onClick={() => setOpenLogin(!openLogin)}
                            aria-controls="collapse-text-login"
                            aria-expanded={openLogin}
                            className="accordion-button collapse-section-button"
                        >
                            Contact
                        </Button>
                        <Collapse in={openLogin}>
                            {
                                auth.authenticate ? renderLoggedInText() : renderNonLoggedInText()
                            }

                        </Collapse>
                    </div>
                    <div className="collapse-section">
                        <Button
                            onClick={() => setOpenDelivery(!openDelivery)}
                            aria-controls="collapse-text-delivery"
                            aria-expanded={openDelivery}
                            className="accordion-button collapse-section-button"
                        >
                            Delivery
                        </Button>
                        <Collapse in={openDelivery}>

                            <div className="collapse-text" id="collapse-text-delivery">
                                {auth.authenticate ?
                                    <div>
                                        {user.addresses && user.addresses.map((address, index) => (
                                            <div key={index} className="form-check checkout-address">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id={index} defaultChecked={index === 0} />
                                                <label for={index} className="address-info">
                                                    <div>{address.fullName}</div>
                                                    <div>
                                                        {address.addressLine1}
                                                        {address.addressLine2 && <span> {address.addressLine2}</span>}
                                                    </div>
                                                    <div>{address.city}, {address.state} {address.postalCode} {address.country}</div>
                                                </label>
                                                <button
                                                    onClick={() => delAddress(index)}
                                                    className="del-address-button btn"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <AddressForm />
                                }
                                {auth.authenticate &&
                                    <div className="add-address-button">
                                        <button
                                            onClick={() => setOpenAddressModal(true)}
                                        >
                                            <FaPlus className="plus-icon" /> Add new address
                                        </button>
                                    </div>
                                }
                            </div>
                        </Collapse>
                    </div>
                    <div className="collapse-section">
                        <Button
                            onClick={() => setOpenPayment(!openPayment)}
                            aria-controls="collapse-text-payment"
                            aria-expanded={openPayment}
                            className="accordion-button collapse-section-button"
                        >
                            Payment
                        </Button>
                        <Collapse in={openPayment}>
                            <div className="collapse-text" id="collapse-text-payment">
                                <div className="transactions-disclaimer">All transactions are secure and encrypted.</div>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Credit Card</Accordion.Header>
                                        <Accordion.Body>
                                            <CreditCardForm />
                                            <Button 
                                                className="pay-now-button"
                                                onClick={() => placeOrderWithCard()}
                                            >
                                                Place Order
                                            </Button>
                                        </Accordion.Body>

                                    </Accordion.Item>
                                    {/* <Accordion.Item eventKey="1">
                                        <Accordion.Header>PayPal</Accordion.Header>
                                        <Accordion.Body>
                                            <Button
                                                className="pay-now-button"
                                            >
                                                Place Order With PayPal
                                            </Button>
                                        </Accordion.Body>
                                    </Accordion.Item> */}
                                </Accordion>
                            </div>
                        </Collapse>
                    </div>
                </div >

                <div className="checkout-order-details">
                    {
                        cartItems.length > 0 ?
                            cartItems.map((cartItem, index) =>
                                <CheckoutItem
                                    key={cartItem.name}
                                    image={cartItem.img}
                                    name={cartItem.name}
                                    price={cartItem.price}
                                    quantity={cartItem.qty}
                                />
                            ) : <p>No items in the cart</p>
                    }
                    <div className="checkout-summary-container">
                        <div className="checkout-summary">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="checkout-summary">
                            <span>Shipping</span>
                            <span>$6.99</span>
                        </div>
                        <div className="checkout-summary">
                            <span>Tax</span>
                            <span>${(subtotal * 0.06).toFixed(2)}</span>
                        </div>
                        <div className="checkout-summary">
                            <span>Toatal</span>
                            <span>${(subtotal + 6.99 + (subtotal * 0.06)).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>


            <LoginModal
                show={openLoginModal}
                handleHide={() => setOpenLoginModal(false)}
                modalTitle="Login"
            />
            <AddAddressModal
                show={openAddressModal}
                handleHide={() => setOpenAddressModal(false)}
                modalTitle="Add Address"
            />

        </Layout >
    )

}

export default CheckoutPage;
