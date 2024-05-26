import axios from "../helpers/axios";
import { authConstants, cartConstants } from "./constants";

export const login = (user) => {

    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });

        try {
            const res = await axios.post('/login', {
                ...user
            });

            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: error.response.data.message }
                });
            } else {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {error: 'An unexpected error occured while loggin in.'}
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post('/logout');

        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
            dispatch({ type: cartConstants.RESET_CART });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}
