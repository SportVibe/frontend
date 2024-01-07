import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_SHOPPING_CART,
  DELETE_MULTIPLE_PRODUCTS_FROM_CART,
  CLEAR_SHOPPING_CART,
  CAPTURE_ORDER,
  UPDATE_CART_ITEM_QUANTITY,
} from '../redux/actions';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  
  let existingItemIndex;
  let productId, newQuantity;
  let filteredItems;
  let updatedItemsQuantity;

  switch (action.type) {
    case ADD_TO_CART:
      existingItemIndex = state.items.findIndex(item => item.data.id === action.payload.data.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      filteredItems = state.items.filter(item => item.data.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case GET_SHOPPING_CART:
      
      return {
        ...state,
        items: action.payload, 
      };

    case DELETE_MULTIPLE_PRODUCTS_FROM_CART:
      
      return {
        ...state,
        items: [],
      };

    case CLEAR_SHOPPING_CART:
     
      return {
        ...state,
        items: [], 
      };

    case CAPTURE_ORDER:
     
      return {
        ...state,
        capturedOrderId: action.payload,
      };

    case UPDATE_CART_ITEM_QUANTITY:
      
      ({ productId, newQuantity } = action.payload);
      updatedItemsQuantity = state.items.map(item => {
        if (item.data.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });

      return {
        ...state,
        items: updatedItemsQuantity,
      };

    default:
      return state;
  }
};

export default cartReducer;
