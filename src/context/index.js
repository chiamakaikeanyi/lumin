import React, { createContext, useReducer } from 'react';
import { rootReducer } from './reducers';

const initialState = {
  currency: '',
  products: [],
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  updateProductQuantity: () => {},
  loadProducts: () => {}
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
