import React, { useReducer } from 'react';
import { AppContext } from '.';
import { rootReducer } from './reducers';
import { ADD_PRODUCT, LOAD_PRODUCTS, REMOVE_PRODUCT, SET_CURRENCY } from './types';

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, {
    products: [],
    cart: [],
    currency: 'NGN'
  });

  const loadProducts = products => {
    dispatch({ type: LOAD_PRODUCTS, products: products });
  };

  const addProductToCart = product => {
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const updateProductQuantity = (productId, type) => {
    dispatch({ type: type, productId: productId });
  };

  const removeProductFromCart = productId => {
    dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  const setCurrency = currency => {
    dispatch({ type: SET_CURRENCY, currency: currency });
  };

  return (
    <AppContext.Provider
      value={{
        currency: state.currency,
        products: state.products,
        cart: state.cart,
        addProductToCart: addProductToCart,
        updateProductQuantity: updateProductQuantity,
        removeProductFromCart: removeProductFromCart,
        setCurrency: setCurrency,
        loadProducts: loadProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
