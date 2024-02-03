import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Collapse } from 'react-bootstrap';
import Layout from '../../components/Layout';
import LoginModal from '../../components/HeaderComponents/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAddresses, signout } from '../../actions';


/**
 * @author
 * @function CheckoutPage
 */

const CheckoutPage = (props) => {
    const { addresses } = useSelector((state) => state.user);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openLogin, setOpenLogin] = useState(true);
    const [openDelivery, setOpenDelivery] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserAddresses());
      }, [dispatch]);

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
                <span>Have an account? </span>
                <a className="login-anchor" onClick={() => setOpenLoginModal(true)}>Log in</a>
            </div>
        );
    }

    return (
        <Layout>
            <div className="checkout-options-container">
                <div className="collapse-section">
                    <Button
                        onClick={() => setOpenLogin(!openLogin)}
                        aria-controls="collapse-text-login"
                        aria-expanded={openLogin}
                        className="accordion-button"
                    >
                        1. Login
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
                        className="accordion-button"
                    >
                        2. Delivery
                    </Button>
                    <Collapse in={openDelivery}>
                        <div className="collapse-text" id="collapse-text-delivery">
                            {addresses.map((address, index) =>(
                                <div key={index}>{address.addressLine1}</div>
                            ))}
                        </div>
                    </Collapse>
                </div>
                <div className="collapse-section">
                    <Button
                        onClick={() => setOpenPayment(!openPayment)}
                        aria-controls="collapse-text-payment"
                        aria-expanded={openPayment}
                        className="accordion-button"
                    >
                        3. Payment
                    </Button>
                    <Collapse in={openPayment}>
                        <div className="collapse-text" id="collapse-text-payment">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                    </Collapse>
                </div>
            </div>

            <LoginModal
                show={openLoginModal}
                handleHide={() => setOpenLoginModal(false)}
                modalTitle="Login"
            />

        </Layout>
    )

}

export default CheckoutPage