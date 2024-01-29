import React, { useState } from 'react';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import QuantityInput from '../QuantityInput';

const CartItem = (props) => {

    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = newQuantity => {
        setQuantity(newQuantity);
    };

    const itemUrl = `/${props.name}/${props.id}`;

    return (
        <div className="cart-item-container">
            <div className="row">
                <div className="col">
                    <a href={itemUrl}>
                        <img
                            className="cart-item-image"
                            src={generatePublicUrl(props.img)}
                            alt={props.name}
                        />
                    </a>
                </div>
                <div className="col">
                    <div className="cart-item-name">{props.name}</div>
                    <div className="cart-item-price">${props.price * props.qty}</div>
                    <div className="cart-item-quantity-label">Quantity: </div>
                    <div className="cart-buttons-container">
                        <QuantityInput
                            quantity={props.qty}
                            onChange={handleQuantityChange}
                        />
                        <button className="btn btn-outline-danger cart-remove-btn">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
