import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import Hero from '../Hero';
import styles from './layout.module.scss';

const Layout = ({ children, setShowCart }) => {
  return (
    <Fragment>
      <Navigation setShowCart={setShowCart} />
      <Hero />
      <main className={styles.wrapper}>{children}</main>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
