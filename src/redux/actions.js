import axios from 'axios';

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";


export const getProducts = (searchTerm) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3005/search/${searchTerm}`);
    dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_PRODUCTS_FAILURE', payload: error.message });
  }
};