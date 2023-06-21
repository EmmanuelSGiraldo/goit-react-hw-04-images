import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';
import { Modal } from '../Modal/Modal';


export const ImageGalleryItem = ({ url, alt, largeImage }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.Item} onClick={toggleModal}>
        <img className={styles.card} src={url} alt={alt} loading="lazy" />
      </div>
      {isShowModal && (
        <Modal onClose={toggleModal}>
          <img alt={alt} src={largeImage} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};


