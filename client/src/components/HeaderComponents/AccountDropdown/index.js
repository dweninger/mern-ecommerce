// AccountDropdown.js
import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { PiNotebookFill } from "react-icons/pi";
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { useState } from 'react';
import './style.css'; // Include your custom CSS file

const AccountDropdown = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowPopover(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowPopover(false);
  };

  const handlePopoverHide = () => {
    setShowPopover(false);
  };

  const popover = (
    <div className="account-popover">
      <Popover id="popover-trigger-click" title="Account">
        <div className="account-container">
          <span className="account-header">Account</span>
          <div className="account-links">
            <button onClick={handleShowLogin} className="account-link"><IoLogIn /> Log In</button>
            <button onClick={handleShowRegister} className="account-link"><IoLogIn /> Register</button>
            <button className="account-link"><IoLogIn /> Logout</button>
          </div>
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
        onHide={handlePopoverHide}
        className="bg-white"
      >
        <Button
          variant="light"
          className="account-button bg-white border-0"
          onClick={() => setShowPopover(!showPopover)}
        >
          <FaUser />
          <span className="button-text"> Account</span>
        </Button>
      </OverlayTrigger>

      <LoginModal
        show={showLogin}
        handleHide={() => setShowLogin(false)}
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
