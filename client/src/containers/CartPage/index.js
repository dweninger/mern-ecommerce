import React from 'react';
import Layout from '../../components/Layout';
import './style.css';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';


/**
 * @author
 * @function CartPage
 */

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    const cartItems = cart.cartItems;

    return (
        <Layout>
            <div className="cart-items-container">
                {
                    Object.keys(cartItems).map((key, index) =>
                        <CartItem
                            id={key}
                            name={cartItems[key].name}
                            price={cartItems[key].price}
                            img={cartItems[key].img}
                            qty={cartItems[key].qty}
                        />
                    )
                }
            </div>
        </Layout>
    )

}

export default CartPage