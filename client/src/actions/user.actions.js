
import axios from '../helpers/axios';
import { userConstants } from './constants';
import store from '../store';

export const getUserAddressesRequest = () => {
    return {
        type: userConstants.GET_USER_ADDRESSES_REQUEST,
    };
};

export const getUserAddressesSuccess = (addresses) => {
    return {
        type: userConstants.GET_USER_ADDRESSES_SUCCESS,
        payload: addresses,
    };
};

export const getUserAddressesFailure = (error) => {
    return {
        type: userConstants.GET_USER_ADDRESSES_FAILURE,
        payload: error,
    };
};

export const getUserAddresses = () => {
    return async dispatch => {
        dispatch(getUserAddressesRequest());

        const token = store.getState().auth.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.get(`/user/getaddresses`, config);
        if (res.status === 200) {
            dispatch(getUserAddressesSuccess(res.data));
        } else {
            dispatch(getUserAddressesFailure(res.message));
        }
    }
};