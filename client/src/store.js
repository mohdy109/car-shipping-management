import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { carListReducer } from './reducers/carReducer';// Ensure path is correct

const rootReducer = combineReducers({
  carList: carListReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

