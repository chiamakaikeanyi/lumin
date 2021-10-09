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
          <select className={styles.select} defaultValue="">
            <option disabled value="">
              Filter by
            </option>
            {FILTER_OPTIONS.map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default Hero;
