import { userConstants } from "../actions/constants"

const initialState = {
  addresses: [],
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
        error: '',
      };
    case userConstants.GET_USER_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        addresses: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
