// AccountDropdown.js
import React, { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { PiNotebookFill } from "react-icons/pi";
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { useState } from 'react';
import './style.css'; // Include your custom CSS file
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../actions';

const AccountDropdown = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowPopover(false);
  };

  const handleHideLoginModal = () => {
    setShowLogin(false);
};

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowPopover(false);
  };

  const userLogout = (e) => {
    dispatch(signout());
    setShowPopover(false);
}

  useEffect(() => {
    if (auth.authenticate) {

    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <div className="account-links">
        <button className="account-link"> My Account</button>
        <button className="account-link"> My Orders</button>
        <button className="account-link"> My Wishlist</button>
        <button onClick={userLogout} className="account-link"><IoLogOut /> Log Out</button>
      </div>
    );

  }

  const renderNonLoggedInMenu = () => {
    return (
      <div className="account-links">
        <button onClick={handleShowLogin} className="account-link"><IoLogIn /> Log In</button>
        <button onClick={handleShowRegister} className="account-link"><PiNotebookFill /> Register</button>
      </div>
    );
  }

  const popover = (
    <div className="account-popover">
      <Popover id="popover-trigger-click" title="Account">
        <div className="account-container">
          <span className="account-header">Account</span>
          {
            auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()
          }
        </div>
      </Popover>
    </div>
  );

  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        show={showPopover}
        rootClose
        arrowProps={{ arrowRef: null, style: {}, placement: '' }}
        hasDoneInitialMeasure={false}
      >
        <Button
          variant="light"
          className="account-button bg-white border-0"
          onClick={() => setShowPopover(!showPopover)}
        >
          <FaUser />
          <span className="button-text">
            {auth.authenticate ? auth.user.firstName : 'Login'}
          </span>
        </Button>
      </OverlayTrigger>

      <LoginModal
        show={showLogin}
        handleHide={handleHideLoginModal}
        modalTitle="Login"
      >
      </LoginModal>
      <RegisterModal
        show={showRegister}
        handleHide={() => setShowRegister(false)}
        modalTitle="Signup"
      >
      </RegisterModal>
    </div>
  );
};

export default AccountDropdown;
