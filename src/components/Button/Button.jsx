
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export const Button = ({ children, onClick }) => {
  return (
    <button type="button" className={styles["Btn"]} onClick={onClick} aria-label="Load more">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};
