import axios from 'axios';

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";
export const GET_PRODUCTS = "GET_PRODUCTS";


export const getProducts = (searchTerm) => async (dispatch) => {
  try {
    const {data}= await axios.get(`http://localhost:3005/search/${searchTerm}`);
    return dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    return dispatch({ type: 'GET_PRODUCTS_FAILURE', payload: error.message });
  }
};
export const getAllProducts = () => async (dispatch) => {
  try {
    const {data}= await axios.get(`http://localhost:3005/product`);
    return dispatch({ type: 'GET_PRODUCTS', payload: data.data });
  } catch (error) {
    return dispatch({ type: 'GET_PRODUCTS_FAILURE', payload: error.message });
  }
};
