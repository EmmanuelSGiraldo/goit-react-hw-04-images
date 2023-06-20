import  { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';
import { Modal } from '../Modal/Modal';


export class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isShowModal: !prevState.isShowModal,
    }));
  };

  render() {
    const { url, alt, largeImage } = this.props;
    const { isShowModal } = this.state;

    return (
      <>
        <div className={styles['Item']} onClick={this.toggleModal}>
          <img className={styles['card']} src={url} alt={alt} loading="lazy" />
        </div>
        {isShowModal && (
          <Modal onClose={this.toggleModal}>
            <img alt={alt} src={largeImage} />
          </Modal>
          
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
