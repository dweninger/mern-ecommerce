import { categoryConstants, initialDataConstants, productConstants, orderConstants } from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post('./initialData');
        if (res.status === 200) {
            const { categories, products, orders } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
            dispatch({
                type: orderConstants.GET_ALL_ORDERS_SUCCESS,
                payload: { orders }
            });
        }
    }
}