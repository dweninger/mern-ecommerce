import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import { addToCart, removeFromCart, getCartItems } from '../../actions';


/**
 * @author
 * @function CartPage
 */

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const [subtotal, setSubtotal] = useState(0.00);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if(auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQuantityChange = (index, _id, qty, prevQty) => {
        const { name, price, img } = cartItems[index];
        const addAmt = qty - prevQty;
        dispatch(addToCart({_id, name, price, img}, addAmt));
    }

    const onRemoveItem = (index, _id) => {
        const { name, price, img } = cartItems[index];
        dispatch(removeFromCart({_id, name, price, img}));
    }

    useEffect(() =>{
        calculateSubtotal();
    }, [cartItems]);

    const calculateSubtotal = () => {
        let subtotal = 0;
        for (let i = 0; i < Object.values(cartItems).length; i++) {
            subtotal += cartItems[i].price * cartItems[i].qty;
        }
        subtotal = subtotal.toFixed(2);
        setSubtotal(subtotal);
    }
    
    return (
        <Layout>
            <div className="cart-items-container">
                <div className="cart-items-header">Cart Items</div>
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            index={index}
                            cartItem={cartItems[key]}
                            id={cartItems[key]._id}
                            onQuantityChange={onQuantityChange}
                            onRemoveItem={onRemoveItem}
                        />
                    )
                }
                <div className="cart-subtotal-container">
                    <div className="cart-subtotal-title">Subtotal:</div>
                    <div className="cart-subtotal">${subtotal}</div>
                </div>
                <Button
                    className="place-order-button"
                    onClick={() => {
                        navigate('/checkout');
                    }}
                >Place Order</Button>
            </div>
        </Layout>
    )

}

export default CartPage