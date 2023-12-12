import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_SUCCESS,
  GET_CAROUSEL2_PRODUCTS,
  SEARCH_ACTIVITY,
  RESPONSIVE_NAVBAR,
  TOTAL_FILTERS,
  SORT,
  PRICE_FILTER,
  GENRES_FILTER,
} from "./actions";

const initialState = {
  responsiveNavBar: false,
  sort: [{ sort: 'id' }, { typeSort: 'desc' }],
  priceFilter: ['', ''],
  genre: ['', ''],
  totalFilters: [],
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
    case PRICE_FILTER:
      return {
        ...state,
        priceFilter: action.payload
      };
    case GENRES_FILTER:
      return {
        ...state,
        genre: action.payload
      };
    case SORT:
      return {
        ...state,
        sort: action.payload
      };
    case TOTAL_FILTERS:
      return {
        ...state,
        totalFilters: [...state.totalFilters, action.payload]
      };
    case RESPONSIVE_NAVBAR:
      return {
        ...state,
        responsiveNavBar: action.payload
      };
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
