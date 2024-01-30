import React, { useState } from 'react';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import QuantityInput from '../QuantityInput';

const CartItem = (props) => {

    const {
        name, price, qty, img
    } = props.cartItem;

    const _id = props.id;
    const index = props.index;

    const [quantity, setQuantity] = useState(qty);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        props.onQuantityChange(index, _id, newQuantity, qty);
    };

    const itemUrl = `/${name}/${_id}`;

    return (
        <div className="cart-item-container">
            <div className="row">
                <div className="col">
                    <a href={itemUrl}>
                        <img
                            className="cart-item-image"
                            src={generatePublicUrl(img)}
                            alt={name}
                        />
                    </a>
                </div>
                <div className="col">
                    <a href={itemUrl} className="cart-item-name">{name}</a>
                    <div className="cart-item-number">Item #: {_id}</div>
                    <div className="cart-item-price">${(price * qty).toFixed(2)}</div>
                    <div className="cart-item-quantity-label">Quantity: </div>
                    <div className="cart-buttons-container">
                        <QuantityInput
                            quantity={qty}
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
