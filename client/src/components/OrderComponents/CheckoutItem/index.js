import React from 'react';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';

const CheckoutItem = ({
    image,
    quantity,
    name,
    price
}) => {
    return (
        <div className="cart-item-container">
            <div className="cart-item-img-qty">
                <img
                    className="checkout-item-image"
                    src={generatePublicUrl(image)}
                    alt={name}
                />
                <div className="checkout-item-quantity">x{quantity}</div>
            </div>
            <div className="checkout-name-price">
                <div className="checkout-item-name">{name}</div>
                <div className="checkout-item-price"> ${price * quantity}</div>
            </div>
        </div>
    );
};

export default CheckoutItem;
