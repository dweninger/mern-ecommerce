import { orderConstants, cartConstants } from "./constants";
import axios from "../helpers/axios";
import { clearCart } from "./cart.actions";

export const submitOrder = (guest, address, orderItems, orderTotal, paymentDetails) => {
    return async (dispatch, getState) => {
        const { auth, cart } = getState();

        let order = {
            address: address,
            orderItems: orderItems.map(item => ({
                                    product: item._id,
                                    quantity: item.qty
                                })),
            orderTotal: parseFloat(orderTotal),
            payment: {method: 'Credit Card', provider: 'Visa'}
        };

        if (auth.authenticate) {
            order = {
                ...order,
                user: auth.user
            }
        } else {
            order = {
                ...order,
                guest: guest,
            }
        }
       
        dispatch({ type: orderConstants.SUBMIT_ORDER_REQUEST });

        try {
            const res = await axios.post('/order/submitorder', order);
            if (res.status === 201) {
                dispatch({
                    type: orderConstants.SUBMIT_ORDER_SUCCESS,
                    payload: {orderId: res.data.order._id, orderTotal: order.orderTotal}
                });
                dispatch(clearCart());
            }
        } catch (error) {
            dispatch({
                type: orderConstants.SUBMIT_ORDER_FAILURE,
                payload: { error: error.response.data.message }
            });
        }
    } 
};
