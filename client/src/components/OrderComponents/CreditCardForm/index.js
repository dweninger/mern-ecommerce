import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './style.css';

const CreditCardForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');

    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '').substring(0, 16);
        const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '').substring(0, 4);
        const formattedValue = inputValue.replace(/^(\d{2})/, '$1/');
        setExpiryDate(formattedValue);
    };

    const handleCvvChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '').substring(0, 3);
        setCvv(inputValue);
    };

    const handleCardNameChange = (e) => {
        const inputValue = e.target.value.replace(/[^a-zA-Z\s]/g, '').substring(0, 50);
        setCardName(inputValue);
    };

    return (
        <div>
            <div className='row card-input-row'>
                <div className='col md-6'>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="Enter card number"
                        className="form-control"
                    />
                </div>
            </div>
            <div className='row card-input-row'>
                <div className='col md-4'>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY"
                        className="form-control"
                    />
                </div>
                <div className='col md-2'>
                    <input
                        type="text"
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="CVV"
                        className="form-control"
                    />
                </div>
            </div>
            <div className='row card-input-row'>
                <div className='col md-6'>
                    <input
                        type="text"
                        value={cardName}
                        onChange={handleCardNameChange}
                        placeholder="Name on card"
                        className="form-control"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreditCardForm;
