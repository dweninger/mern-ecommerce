import { orderConstants } from "../actions/constants";

const initState = {
    orderItems: [],
    updatingOrder: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case orderConstants.SUBMIT_ORDER_REQUEST:
            state = {
                ...state,
                updatingOrder: true
            }
            break;
        case orderConstants.SUBMIT_ORDER_SUCCESS:
            state = {
                ...state,
                orderItems: action.payload.orderItems,
                updatingOrder: false
            }
            break;
        case orderConstants.SUBMIT_ORDER_FAILURE:
            state = {
                ...state,
                updatingOrder: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}
