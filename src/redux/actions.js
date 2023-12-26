import axios from 'axios';
import buildQueryString from '../utils/queryAlgorithm';
import { API_URL } from '../helpers/config';

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_PAGE_SUCCESS = "GET_PRODUCT_PAGE_SUCCESS";
export const GET_PRODUCT_PAGE_FAILURE = "GET_PRODUCT_PAGE_FAILURE";
export const GET_PRODUCT_PAGE = "GET_PRODUCT_PAGE";
export const GET_CAROUSEL2_PRODUCTS = "GET_CAROUSEL2_PRODUCTS";
export const SEARCH_ACTIVITY = "SEARCH_ACTIVITY";
export const RESPONSIVE_NAVBAR = "RESPONSIVE_NAVBAR";
export const TOTAL_FILTERS = "TOTAL_FILTERS";
export const SORT = "SORT";
export const PRICE_FILTER = "PRICE_FILTER";
export const GENRES_FILTER = "GENRES_FILTER";
export const USER_LOGIN = "USER_LOGIN";

export const getProducts = (filters) => async (dispatch) => {
  try {
    // primero unificamos todas las quieries que se entreguen, si esque las hay
    const queryString = buildQueryString(filters);
    const { data } = await axios.get(`${API_URL}/product?${queryString}`);
    return dispatch({ type: GET_PRODUCTS, payload: data });
  } catch (error) {
    console.error(error.message);
    return dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getCarousel2Products = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/product`);
    return dispatch({ type: GET_CAROUSEL2_PRODUCTS, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const userLoginAction = (logInData) => async (dispatch) => {
  try {
    return dispatch({ type: USER_LOGIN, payload: logInData });
  } catch (error) {
    console.error(error.message);
  }
};

export const searchActivity = (activity) => async (dispatch) => {
  try {
    return dispatch({ type: SEARCH_ACTIVITY, payload: activity });
  } catch (error) {
    console.error(error.message);
  }
};

export const responsiveNavBar = (value) => async (dispatch) => {
  try {
    return dispatch({ type: RESPONSIVE_NAVBAR, payload: value });
  } catch (error) {
    console.error(error.message);
  }
};

export const totalFiltersAction = (value) => async (dispatch) => {
  try {
    return dispatch({ type: TOTAL_FILTERS, payload: value });
  } catch (error) {
    console.error(error.message);
  }
};

export const sortAction = (sort) => async (dispatch) => {
  try {
    return dispatch({ type: SORT, payload: sort });
  } catch (error) {
    console.error(error.message);
  }
};

export const priceFilterAction = (price) => async (dispatch) => {
  try {
    return dispatch({ type: PRICE_FILTER, payload: price });
  } catch (error) {
    console.error(error.message);
  }
};

export const genreFilterAction = (genre) => async (dispatch) => {
  try {
    return dispatch({ type: GENRES_FILTER, payload: genre });
  } catch (error) {
    console.error(error.message);
  }
};

export const getProductPage = ({ page, limit }) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/product?limit=${limit}&page=${page}`);
    return dispatch({ type: GET_PRODUCT_PAGE_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    return dispatch({ type: GET_PRODUCT_PAGE_FAILURE, payload: error.message });
  }
};

export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: itemId,
  };
};