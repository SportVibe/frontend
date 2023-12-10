import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_SUCCESS,
} from "./actions";

const initialState = {
  productsBackup: [],
  products: [],
  mostSoldProducts: [],
  error: null,
  currentPage: 1,
  limitPage: 20,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        productsBackup: action.payload,
        error: null,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsBackup: action.payload,
        mostSoldProducts: action.payload,
        error: null,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    case GET_PRODUCT_PAGE_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
        currentPage: action.payload.currentPage,
        limitPage: action.payload.limitPage,
        error: null,
      };
    case GET_PRODUCT_PAGE_FAILURE:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
