// Import necessary action types
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';

// Initial state for the cart
const initialState = {
  items: [],
};

// Cart reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the item is already in the cart
      const existingItemIndex = state.items.findIndex(item => item.data.id === action.payload.data.id);

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update the quantity
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
        // If the item is not in the cart, add it
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      // Logic to handle removing an item from the cart
      const updatedItems = state.items.filter(item => item.data.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
      };

    case CLEAR_CART:
      // Logic to handle clearing the entire cart
      return {
        ...state,
        items: [],
      };

    // Add more cases as needed for additional actions

    default:
      return state;
  }
};

export default cartReducer;
