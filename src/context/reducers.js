import {
  LOAD_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SET_CURRENCY
} from './types';

const loadProducts = (products, state) => {
  return { ...state, products: products };
};

const addProductToCart = (product, state) => {
  const cart = [...state.cart];
  const cartItemIndex = cart.findIndex(item => item.id === product.id);

  if (cartItemIndex < 0) {
    cart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...cart[cartItemIndex]
    };
    updatedItem.quantity++;
    cart[cartItemIndex] = updatedItem;
  }
  return { ...state, cart };
};

const removeProductFromCart = (productId, state) => {
  const currentCart = [...state.cart];
  const cart = currentCart.filter(product => product.id !== productId);
  return { ...state, cart };
};

const updateProductQuantity = (product, type, state) => {
  const cart = [...state.cart];
  const cartItemIndex = cart.findIndex(item => item.id === product.id);

  const updatedItem = {
    ...cart[cartItemIndex]
  };

  if (type === INCREASE_QUANTITY) {
    updatedItem.quantity++;
  } else {
    updatedItem.quantity--;
  }

  if (updatedItem.quantity === 0) {
    cart.splice(cartItemIndex, 1);
  } else {
    cart[cartItemIndex] = updatedItem;
  }
  return { ...state, cart };
};

const setCurrency = (currency, state) => {
  return { ...state, currency };
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return loadProducts(action.products, state);
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    case INCREASE_QUANTITY:
    case DECREASE_QUANTITY:
      return updateProductQuantity(action.productId, action.type, state);
    case SET_CURRENCY:
      return setCurrency(action.currency, state);
    default:
      return state;
  }
};
