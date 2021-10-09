import styles from './navitem.module.scss';

const NavItem = props => {
  const { id, title, link } = props;

  return (
    <li key={id} className={styles.navitem}>
      <a href={link}>{title}</a>
    </li>
  );
};

export default NavItem;
