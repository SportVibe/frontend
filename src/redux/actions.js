import axios from 'axios';
import buildQueryString from '../utils/queryAlgorithm';

export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_PAGE_SUCCESS = "GET_PRODUCT_PAGE_SUCCESS";
export const GET_PRODUCT_PAGE_FAILURE = "GET_PRODUCT_PAGE_FAILURE";
export const GET_PRODUCT_PAGE = "GET_PRODUCT_PAGE";
export const GET_CAROUSEL2_PRODUCTS = "GET_CAROUSEL2_PRODUCTS";

export const getProducts = (filters) => async (dispatch) => {
  try {
    // primero unificamos todas las quieries que se entreguen, si esque las hay
    const queryString = buildQueryString(filters);
    const { data } = await axios.get(`http://localhost:3005/product?${queryString}`);
    return dispatch({ type: GET_PRODUCTS, payload: data });
  } catch (error) {
    console.error(error.message);
    return dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getCarousel2Products = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3005/product`);
    return dispatch({ type: GET_CAROUSEL2_PRODUCTS, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const getProductPage = ({ page, limit }) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3005/product?limit=${limit}&page=${page}`);
    return dispatch({ type: GET_PRODUCT_PAGE_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    return dispatch({ type: GET_PRODUCT_PAGE_FAILURE, payload: error.message });
  }
};
