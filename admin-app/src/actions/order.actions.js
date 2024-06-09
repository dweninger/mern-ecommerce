import axios from "../helpers/axios";
import { orderConstants } from "./constants";

const getAllOrders = () => {
    return async dispatch => {
        dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST });
        try {
            const res = await axios.get('order/getorder');
            if (res.status === 200) {
                const { orders } = res.data;
                dispatch({
                    type: orderConstants.GET_ALL_ORDERS_SUCCESS,
                    payload: { orders }
                });
            } else {
                dispatch({
                    type: orderConstants.GET_ALL_ORDERS_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            dispatch({
                type: orderConstants.GET_ALL_ORDERS_FAILURE,
                payload: { error: error.message }
            });
        }
    }
}

export const updateOrder = (orderId, orderStatus) => {
    return async dispatch => {
        dispatch({ type: orderConstants.UPDATE_ORDER_STATUS_REQUEST });
        try {
            const res = await axios.post(`/order/updatestatus`, {id: orderId, status: orderStatus});
            if (res.status === 201) {
                dispatch({ type: orderConstants.UPDATE_ORDER_STATUS_SUCCESS });
                dispatch(getAllOrders());
            } else {
                const { error } = res.data.error;
                dispatch({
                    type: orderConstants.UPDATE_ORDER_STATUS_FAILURE,
                    payload: error
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
