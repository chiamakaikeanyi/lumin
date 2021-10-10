import { FILTER_OPTIONS } from '../../lib/constants';
import styles from './hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header_wrapper}>
        <div>
          <h1 className={styles.title}>All Products</h1>
          <p className={styles.subtitle}>A 360° look at Lumin</p>
        </div>
        <div className={styles.select_wrapper}>
          <label>
            <select className={styles.select} defaultValue="">
              <option disabled value="">
                Filter by
              </option>
              {FILTER_OPTIONS?.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
};

export default Hero;
