import { orderConstants } from "../actions/constants";

const initialState = {
    orders: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case orderConstants.GET_ALL_ORDERS_REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;
        case orderConstants.GET_ALL_ORDERS_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders
            }
            break;
        case orderConstants.GET_ALL_ORDERS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            };
            break;
        case orderConstants.UPDATE_ORDER_STATUS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case orderConstants.UPDATE_ORDER_STATUS_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case orderConstants.UPDATE_ORDER_STATUS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        default:
            break;
    }
    return state;
}