import { orderConstants } from "./constants";
import axios from "../helpers/axios";

export const submitOrder = (guest, address, orderItems, orderTotal, paymentDetails) => {
    return async (dispatch, getState) => {
        const { auth } = getState();

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
                user: auth
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
                    payload: order
                });
            }
        } catch (error) {
            dispatch({
                type: orderConstants.SUBMIT_ORDER_FAILURE,
                payload: { error: error.response.data.message }
            });
        }
    } 
};