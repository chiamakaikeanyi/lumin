import { useContext, useEffect, memo } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { PRODUCT } from '../../lib/grapqlType';
import axios from 'axios';
import { AppContext } from '../../context';
import { CURRENCY_API } from '../../lib/constants';
import { formatPrice } from '../../lib/utils';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import styles from './listing.module.scss';

const Listing = ({ setShowCart }) => {
  const context = useContext(AppContext);
  const { currency, setCurrency, addProductToCart, loadProducts } = context;

  const { loading, data, networkStatus } = useQuery(PRODUCT, {
    variables: {
      currency: currency
    }
  });

  useEffect(() => {
    const getUserCurrency = async () => {
      const { data: response } = await axios.get(CURRENCY_API);
      setCurrency(response);
    };

    getUserCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadProducts(data?.products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.products, currency]);

  function handleAddToCart(product) {
    addProductToCart(product);
    setShowCart(true);
  }

  if (loading || networkStatus === NetworkStatus.refetch) return <Loader />;

  return (
    <section className={styles.item_container}>
      <ul className={styles.item_wrapper}>
        {data?.products?.map(product => (
          <li key={product.id} className={styles.item}>
            <a href="/">
              <div className={styles.item_image_wrapper}>
                <img
                  src={product.image_url}
                  alt={product.title}
                  className={styles.item_image}
                  loading="lazy"
                />
              </div>
              <h2 className={styles.item_title}>{product.title}</h2>
            </a>
            <p className={styles.item_price}>{`${currency} ${formatPrice(product.price)}`}</p>
            <Button
              label="Add to Cart"
              handleClick={() => handleAddToCart(product)}
              className={styles.item_btn}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

const MemoizedListing = memo(Listing);
export default MemoizedListing;
