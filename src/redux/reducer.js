import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_SUCCESS,
  GET_CAROUSEL2_PRODUCTS,
  SEARCH_ACTIVITY
} from "./actions";

const initialState = {
  search: '',
  productsBackup: [],
  products: [],
  carousel2Render: [],
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
        error: null,
      };
    case GET_CAROUSEL2_PRODUCTS:
      return {
        ...state,
        carousel2Render: action.payload,
        error: null,
      };
    case SEARCH_ACTIVITY:
      return {
        ...state,
        search: action.payload,
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
