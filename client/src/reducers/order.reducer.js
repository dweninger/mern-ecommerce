import { orderConstants } from "../actions/constants";

const initState = {
    orderId: '',
    orderTotal: 0.00,
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
                orderId: action.payload.orderId,
                orderTotal: action.payload.orderTotal,
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
