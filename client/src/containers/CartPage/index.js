import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';
import { addToCart, getCartItems } from '../../actions';


/**
 * @author
 * @function CartPage
 */

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if(auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQuantityChange = (_id, qty, prevQty) => {
        const { name, price, img } = cartItems[_id];
        const addAmt = qty - prevQty;
        dispatch(addToCart({_id, name, price, img}, addAmt))
    }

    return (
        <Layout>
            <div className="cart-items-container">
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityChange={onQuantityChange}
                        />
                    )
                }
            </div>
        </Layout>
    )

}

export default CartPage