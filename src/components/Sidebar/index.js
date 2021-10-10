import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENCY } from '../../lib/grapqlType';
import { AppContext } from '../../context';
import { composeClasses, formatPrice } from '../../lib/utils';
import { INCREASE_QUANTITY, DECREASE_QUANTITY } from '../../context/types';
import styles from './sidebar.module.scss';

const Sidebar = ({ showCart, setShowCart }) => {
  const { data: currencyList } = useQuery(CURRENCY);
  const context = useContext(AppContext);
  const { currency, products, cart, removeProductFromCart, updateProductQuantity, setCurrency } =
    context;

  let initialCart = [...cart];

  const updateCurrency = ({ target }) => {
    setCurrency(target?.value);
  };

  const handleClose = () => {
    setShowCart(false);
  };

  return (
    <aside className={composeClasses(styles.sidebar, showCart && styles.sidebar_open)}>
      <div className={styles.sidebar_header}>
        <div className={styles.close_button_wrapper}>
          <button className={styles.close_button} onClick={handleClose}>
            <span className={styles.close_icon}>&gt;</span>
          </button>
        </div>
        <h2 className={styles.sidebar_title}>Your Cart</h2>
      </div>

      {currency && (
        <label>
          <select
            className={styles.currency}
            onChange={evt => updateCurrency(evt)}
            defaultValue={currency}
          >
            {currencyList?.currency.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      )}

      {initialCart?.length === 0 ? (
        <p className={styles.emptyCart}>There are no items in your cart.</p>
      ) : (
        <>
          <ul className={styles.list_wrapper}>
            {initialCart?.map(cartItem => {
              const productIndex = products?.findIndex(product => product.id === cartItem.id);
              const initialCartIndex = initialCart?.findIndex(item => item.id === cartItem.id);

              const updatedPrice =
                (products && products[productIndex] && products[productIndex].price) || 0;

              initialCart[initialCartIndex] = {
                ...initialCart[initialCartIndex],
                price: updatedPrice
              };

              return (
                <li key={cartItem.id}>
                  <div className={styles.cart_item}>
                    <div className={styles.cart_item_description}>
                      <button
                        className={styles.remove_product_wrapper}
                        onClick={() => removeProductFromCart(cartItem.id)}
                      >
                        <span className={styles.remove_product}>X</span>
                      </button>

                      <h6 className={styles.cart_item_name}>{cartItem.title}</h6>
                      {cartItem?.product_options && cartItem?.product_options[0]?.options && (
                        <div className={styles.cart_item_option}>
                          <span>{cartItem?.product_options[0]?.options[0]?.value}</span>{' '}
                          <span>| {cartItem?.product_options[1]?.options[0]?.value}</span>
                        </div>
                      )}

                      {cartItem?.product_options && cartItem?.product_options[2]?.options && (
                        <div className={styles.cart_item_supply}>
                          <span>{cartItem?.product_options[2]?.options[0]?.value}</span>{' '}
                          <span>| {cartItem?.product_options[2]?.options[1]?.value}</span>
                        </div>
                      )}

                      <div className={styles.quantity}>
                        <div className={styles.quantity_selector}>
                          <button
                            className={composeClasses(styles.counter_action, styles.decrement)}
                            onClick={() => updateProductQuantity(cartItem, DECREASE_QUANTITY)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={cartItem.quantity}
                            step="1"
                            min="1"
                            max="1000"
                            className={composeClasses(styles.counter_number, styles.counter)}
                            readOnly
                          />
                          <button
                            className={composeClasses(styles.counter_action, styles.increment)}
                            onClick={() => updateProductQuantity(cartItem, INCREASE_QUANTITY)}
                          >
                            +
                          </button>
                        </div>
                        <div className={styles.price}>{`${currency} ${formatPrice(
                          updatedPrice * cartItem.quantity
                        )}`}</div>
                      </div>
                    </div>
                    <div className={styles.cart_item_image_wrapper}>
                      <img
                        src={cartItem.image_url}
                        alt={cartItem.title}
                        className={styles.cart_item_image}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <footer className={styles.cart_footer}>
            <div className={styles.cart_subtotal}>
              <span className={styles.cart_subtotal_title}>Subtotal</span>
              <span className={styles.cart_subtotal_price}>{`${currency} ${formatPrice(
                initialCart?.reduce((acc, currItem) => {
                  return acc + currItem.price * currItem.quantity || 0;
                }, 0)
              )}`}</span>
            </div>
            <div>
              <button type="submit" className={styles.cart_button}>
                Proceed to Checkout
              </button>
            </div>
          </footer>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
