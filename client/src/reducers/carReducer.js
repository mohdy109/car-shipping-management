import {
    CAR_LIST_REQUEST,
    CAR_LIST_SUCCESS,
    CAR_LIST_FAIL,
    CAR_ADD_SUCCESS,
    CAR_UPDATE_SUCCESS,
    CAR_DELETE_SUCCESS,
  } from '../constants/carConstants';
  
  const initialState = {
    loading: false,
    error: null,
    cars: [],
  };
  
  export const carListReducer = (state = initialState, action) => {
    switch (action.type) {
      case CAR_LIST_REQUEST:
        return { ...state, loading: true };
      case CAR_LIST_SUCCESS:
        return { ...state, loading: false, cars: action.payload };
      case CAR_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
      case CAR_ADD_SUCCESS:
        return { ...state, cars: [...state.cars, action.payload] };
      case CAR_UPDATE_SUCCESS:
        return {
          ...state,
          cars: state.cars.map((car) =>
            car._id === action.payload._id ? action.payload : car
          ),
        };
      case CAR_DELETE_SUCCESS:
        return {
          ...state,
          cars: state.cars.filter((car) => car._id !== action.payload),
        };
      default:
        return state;
    }
  };
  