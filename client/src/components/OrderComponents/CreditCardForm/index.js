import React from 'react';
import './style.css';

const CreditCardForm = ({creditCard, setCreditCard}) => {
    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '').substring(0, 16);
        const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCreditCard({...creditCard, cardNumber: formattedValue});
    };

    const handleExpiryDateChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '').substring(0, 4);
        const formattedValue = inputValue.replace(/^(\d{2})/, '$1/');
        setCreditCard({...creditCard, expiryDate: formattedValue});
    };

    const handleCvvChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '').substring(0, 3);
        setCreditCard({...creditCard, cvv: inputValue});
    };

    const handleCardNameChange = (e) => {
        const inputValue = e.target.value.replace(/[^a-zA-Z\s]/g, '').substring(0, 50);
        setCreditCard({...creditCard, cardName: inputValue});
    };

    return (
        <div>
            <div className='row card-input-row'>
                <div className='col md-6'>
                    <input
                        type="text"
                        value={creditCard.cardNumber}
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
                        value={creditCard.expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY"
                        className="form-control"
                    />
                </div>
                <div className='col md-2'>
                    <input
                        type="text"
                        value={creditCard.cvv}
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
                        value={creditCard.cardName}
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
