import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS,
  GET_PRODUCT_PAGE_SUCCESS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_CAROUSEL2_PRODUCTS,
  SEARCH_ACTIVITY,
  RESPONSIVE_NAVBAR,
  TOTAL_FILTERS,
  SORT,
  PRICE_FILTER,
  GENRES_FILTER,
  USER_LOGIN,
  GET_CURRENT_USER,
  DISCOUNT_PRODUCTS,
  QUANTITY__TOTAL_CART,
  GET_CURRENT_ADMIN,
  CATEGORY_FILTER,
  BRAND_FILTER,
  SPORT_FILTER,
  FILTER_COUNT,
  GET_MASTER_FILTER_PRODUCTS,
  CART,
  DISPLAY_DROPDOWN
} from "./actions";

const initialState = {
  responsiveNavBar: false,
  displayDropDown: false,
  currentUserData: null,
  currentAdminData: null,
  filterCounter: [],
  sort: [{ sort: 'id' }, { typeSort: 'desc' }],
  discount: [{ discount: 0 }],
  priceFilter: ['', ''],
  genre: [{ gender: '' }],
  brand: [{ brand: '' }],
  sport: [{ sport: '' }],
  category: [{ category: '' }],
  totalFilters: [],
  search: '',
  masterFilter: [],
  products: [],
  userData: '',
  carousel2Render: [],
  error: null,
  currentPage: 1,
  limitPage: 20,
  totalCartQuantity: 0,
  cart: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUserData: action.payload
      };
    case GET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdminData: action.payload
      };
    case CART:
      return {
        ...state,
        cart: action.payload
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };
    case GET_MASTER_FILTER_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        masterFilter: action.payload,
        error: null,
      };
    case FILTER_COUNT:
      return {
        ...state,
        filterCounter: action.payload
      };
    case PRICE_FILTER:
      return {
        ...state,
        priceFilter: action.payload,
        filterCounter: { ...state.filterCounter, price: action.payload },
      };
    case DISCOUNT_PRODUCTS:
      return {
        ...state,
        discount: action.payload,
        filterCounter: { ...state.filterCounter, discount: action.payload },
      };
    case GENRES_FILTER:
      return {
        ...state,
        genre: action.payload,
        filterCounter: { ...state.filterCounter, genres: action.payload },
      };
    case SPORT_FILTER:
      return {
        ...state,
        sport: action.payload,
        filterCounter: { ...state.filterCounter, sport: action.payload },
      };
    case BRAND_FILTER:
      return {
        ...state,
        brand: action.payload,
        filterCounter: { ...state.filterCounter, brand: action.payload },
      };
    case CATEGORY_FILTER:
      return {
        ...state,
        category: action.payload,
      };
    case SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case TOTAL_FILTERS:
      return {
        ...state,
        totalFilters: [...state.totalFilters, action.payload],
      };
    case RESPONSIVE_NAVBAR:
      return {
        ...state,
        responsiveNavBar: action.payload,
      };
    case DISPLAY_DROPDOWN:
      return {
        ...state,
        displayDropDown: action.payload,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        productsBackup: action.payload,
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
    case USER_LOGIN:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    default:
      return state;
    case QUANTITY__TOTAL_CART:
      return {
        ...state,
        totalCartQuantity: Number(action.payload),
      };
  }
};

export default productReducer;
