import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
});

export default store;