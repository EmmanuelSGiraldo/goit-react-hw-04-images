import  { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export const Button = ({ children, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className={styles.Btn}
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Load more"
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

