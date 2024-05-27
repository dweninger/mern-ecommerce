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
        const { cart: { cartItems }, auth } = getState();

        // Convert cartItems from object to array
        const cartArray = Object.values(cartItems);

        // Check if the product already exists in the cart
        const existingItemIndex = cartArray.findIndex(item => item._id === product._id);

        let updatedCartItems;
        if (existingItemIndex !== -1) {
            // If the product exists, update the quantity
            cartArray[existingItemIndex].qty += newQty;
            updatedCartItems = [...cartArray];
        } else {
            // If the product does not exist, add it to the cart
            console.log(newQty);
            updatedCartItems = [...cartArray, { ...product, qty: newQty }];
        }

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: updatedCartItems.map(item => ({
                    product: item._id,
                    quantity: item.qty
                }))
            };
            try {
                const res = await axios.post('/user/cart/addtocart', payload);
                if (res.status === 201) {
                    dispatch(getCartItems());
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems: updatedCartItems }
                    });
                }
            } catch (error) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_FAILURE,
                    payload: { error: error.response.data.message }
                });
            }
        } else {
            // If not authenticated, update only localStorage
            const updatedCartItemsObj = updatedCartItems.reduce((acc, item, index) => {
                acc[index] = item;
                return acc;
            }, {});

            localStorage.setItem('cart', JSON.stringify(updatedCartItemsObj));

            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems: updatedCartItemsObj }
            });
        }
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
