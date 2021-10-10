import { useContext } from 'react';
import { AppContext } from '../../context';
import { NAV_ITEMS } from '../../lib/constants';
import NavItem from '../NavItem';
import styles from './navigation.module.scss';
import Logo from '../../images/logo.png';
import Cart from '../../images/cart.png';

export const Navigation = ({ setShowCart }) => {
  const { cart } = useContext(AppContext);
  const cartLength =
    cart?.reduce((count, currItem) => {
      return count + currItem.quantity;
    }, 0) || 0;

  return (
    <header className={styles.header_wrapper}>
      <nav className={styles.nav_container}>
        <div className={styles.nav_wrapper}>
          <a href="/">
            <img src={Logo} alt="Lumin Logo" className={styles.logo} />
          </a>
          <ul className={styles.navitem_wrapper}>
            {NAV_ITEMS?.map(navItem => (
              <NavItem key={navItem.id} {...navItem} />
            ))}
          </ul>
        </div>
        <div className={styles.account_wrapper}>
          <a href="/">Account</a>
          <button className={styles.cart_button} onClick={() => setShowCart(true)}>
            <img src={Cart} alt="Cart icon" className={styles.cart_icon} />
            <span className={styles.counter}>{cartLength}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
