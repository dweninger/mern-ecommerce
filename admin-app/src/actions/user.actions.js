import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const register = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({type: userConstants.USER_REGISTER_REQUEST});
        console.log('before axios post');
        const res = await axios.post('/admin/register', {
            ...user
        });
        console.log('after axios post');
        if(res.status === 201) {
            console.log('status 201');
            const {message} = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {message}
            });
        } else {
            console.log('status 400');
            if(res.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}