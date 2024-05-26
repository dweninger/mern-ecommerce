
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

export const addAddress = (address) => {
    return async (dispatch, getState) => {

        dispatch({
            type: userConstants.ADD_USER_ADDRESSES_REQUEST
        });
        const { auth } = getState();
        const token = auth.token;
        const userId = auth.user._id;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                ...address,
                userId,
            }
        };
        try {
            const res = await axios.post(`/user/addaddress`, config);
            if (res.status === 200) {
                dispatch({
                    type: userConstants.ADD_USER_ADDRESSES_SUCCESS,
                    payload: { address: address }
                });
            }
        } catch (error) {
            dispatch(
                {
                    type: userConstants.ADD_USER_ADDRESSES_FAILURE,
                    payload: error.response.data.message
                }
            );
        }
    };
};

export const deleteAddress = (index) => {
    return async (dispatch, getState) => {

        dispatch({
            type: userConstants.DELETE_USER_ADDRESS_REQUEST,
        });

        const token = store.getState().auth.token;
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                index
            }
        };
        try {
            const res = await axios.post(`/user/deleteaddress`, config);
            if (res.status === 200) {
                dispatch({
                    type: userConstants.DELETE_USER_ADDRESS_SUCCESS,
                    payload: res.message
                });
            }
        } catch (error) {
            dispatch(
                {
                    type: userConstants.DELETE_USER_ADDRESS_FAILURE,
                    payload: error
                }
            );
        }
    };
}