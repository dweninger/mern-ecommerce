import categoryReducer from './category.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    category: categoryReducer,
});

export default rootReducer;