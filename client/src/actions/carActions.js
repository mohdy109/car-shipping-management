import axios from 'axios';
import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_ADD_SUCCESS,
  CAR_UPDATE_SUCCESS,
  CAR_DELETE_SUCCESS,
} from '../constants/carConstants';

const getToken = () => localStorage.getItem('token');

export const listCars =  (params) => async (dispatch)=> {
  try {
    dispatch({ type: CAR_LIST_REQUEST });
    const { data } = await axios.get('http://localhost:5001/api/cars', {
      params,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    dispatch({ type: CAR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CAR_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addCar = (car) => async (dispatch) => {
  const { data } = await axios.post('http://localhost:5001/api/cars', car, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  dispatch({ type: CAR_ADD_SUCCESS, payload: data });
};

export const updateCar = (id, car) => async (dispatch) => {
  const { data } = await axios.patch(`http://localhost:5001/api/cars/${id}`, car, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  dispatch({ type: CAR_UPDATE_SUCCESS, payload: data });
};

export const deleteCar = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5001/api/cars/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  dispatch({ type: CAR_DELETE_SUCCESS, payload: id });
};
