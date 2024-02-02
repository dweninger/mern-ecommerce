import { cartConstants } from "./constants";
import store from '../store';
import axios from "../helpers/axios";

const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axios.post(`/user/getCartItems`);
            if (res.status === 200) {
                const { cartItems } = res.data;
                console.log({ getCartItems: cartItems });
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addToCart = (product, newQty = 1) => {
    return async (dispatch, getState) => {
        const { cart: { cartItems }, auth } = store.getState();

        const cartArray = Object.values(cartItems);
        let existingItem = cartArray.find(item => item._id === product._id);

        const qty = existingItem
            ? parseInt(existingItem.qty + newQty)
            : 1;

        existingItem = {
            ...product,
            qty
        };

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: [{
                    product: product._id,
                    quantity: qty
                }]
            };
            console.log("payload", payload);
            const res = await axios.post('/user/cart/addtocart', payload);
            if (res.status === 201) {
                dispatch(getCartItems());
            }
        } else {
            // If not authenticated, update only localStorage
            const updatedCartItems = {
                ...cartItems,
                [product._id]: existingItem
            };
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        }

        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems: [existingItem, ...cartArray] }
        });
    };
};

export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null;

        if (auth.authenticate) {
            localStorage.removeItem('cart');
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id,
                        }
                    })
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post('/user/cart/addtocart', payload);
                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            }
        } else {
            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems }
                });
            }
        }
    }
}

export {
    getCartItems
}
