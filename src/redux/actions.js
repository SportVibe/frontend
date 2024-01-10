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
export const DISCOUNT_PRODUCTS = "DISCOUNT_PRODUCTS";
export const RESPONSIVE_NAVBAR = "RESPONSIVE_NAVBAR";
export const TOTAL_FILTERS = "TOTAL_FILTERS";
export const SORT = "SORT";
export const PRICE_FILTER = "PRICE_FILTER";
export const GENRES_FILTER = "GENRES_FILTER";
export const USER_LOGIN = "USER_LOGIN";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const GET_CURRENT_ADMIN = "GET_CURRENT_ADMIN";
export const CREATE_ORDER = "CREATE_ORDER";
export const GET_SHOPPING_CART = "GET_SHOPPING_CART";
export const DELETE_MULTIPLE_PRODUCTS_FROM_CART = "DELETE_MULTIPLE_PRODUCTS_FROM_CART";
export const CLEAR_SHOPPING_CART = "CLEAR_SHOPPING_CART";
export const CAPTURE_ORDER = "CAPTURE_ORDER";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const QUANTITY__TOTAL_CART = "QUANTITY__TOTAL_CART";
export const CATEGORY_FILTER = "CATEGORY_FILTER";


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

export const getCurrentUserAction = (user) => async (dispatch) => {
  try {
    return dispatch({ type: GET_CURRENT_USER, payload: user });
  } catch (error) {
    console.error(error.message);
  }
};

export const getAdminUserAction = (admin) => async (dispatch) => {
  console.log(admin);
  try {
    return dispatch({ type: GET_CURRENT_ADMIN, payload: admin });
  } catch (error) {
    console.error(error.message);
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

export const discountProducts = (discount) => async (dispatch) => {
  try {
    return dispatch({ type: DISCOUNT_PRODUCTS, payload: discount });
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

export const categoryAction = (category) => async (dispatch) => {
  try {
    return dispatch({ type: CATEGORY_FILTER, payload: category });
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

export const getShoppingCart = (userId) => async (dispatch) => {
  try {
    if (!userId) {
      console.error("UserId is undefined");
      return;
    }
    const { data } = await axios.get(`${API_URL}/shoppingCart?userId=${userId}`);
    dispatch({ type: GET_SHOPPING_CART, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteProductFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteMultipleProductsFromCart = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/cart/${userId}/delete-multiple`);
    dispatch({ type: DELETE_MULTIPLE_PRODUCTS_FROM_CART });
  } catch (error) {
    console.error(error.message);
  }
};
export const clearShoppingCart = (userId) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/cart/${userId}/delete`);
    dispatch({ type: CLEAR_SHOPPING_CART });
  } catch (error) {
    console.error(error.message);
  }
};
export const createOrder = (orderData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/create-order`, orderData);
    dispatch({ type: CREATE_ORDER, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};
export const captureOrder = (orderId) => async (dispatch) => {
  try {
    await axios.get(`${API_URL}/capture-order?orderId=${orderId}`);
    dispatch({ type: CAPTURE_ORDER, payload: orderId });
  } catch (error) {
    console.error(error.message);
  }
};
export const updateCartItemQuantity = (productId, newQuantity) => async (dispatch) => {
  try {

    dispatch({ type: UPDATE_CART_ITEM_QUANTITY, payload: { productId, newQuantity } });
  } catch (error) {
    console.error(error.message);
  }
};

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART, payload: product });
  } catch (error) {
    console.error(error.message);
  }
};

export const quantityCartAction = (total) => async (dispatch) => {
  try {
    dispatch({ type: QUANTITY__TOTAL_CART, payload: total });
  } catch (error) {
    console.error(error.message);
  }
};