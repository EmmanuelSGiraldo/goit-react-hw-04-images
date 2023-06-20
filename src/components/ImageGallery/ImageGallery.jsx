import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { fetchGalleryWithQuery } from '../../services/pixabay-api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './ImageGallery.module.scss';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps) {
    const prevSearchQuery = prevProps.query;
    const nextSearchQuery = this.props.query;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const { hits, total } = await fetchGalleryWithQuery(nextSearchQuery, 1);

        if (total === 0) {
          const error = new Error('Sorry, there are no images matching your search query.');
          this.setState({ error, status: 'rejected' });
          return;
        }

        this.setState((prevState) => ({
          gallery: hits,
          status: 'resolved',
          page: prevState.page + 1,
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  loadMoreHandler = async () => {
    try {
      const { hits } = await fetchGalleryWithQuery(this.props.query, this.state.page);
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { gallery, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      Notify.failure(`${error.message}`);
      return null;
    }

    if (status === 'resolved') {
      return (
        <>
          <div className={styles["Gallery"]}>
            {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
              />
            ))}
          </div>
          <Button onClick={this.loadMoreHandler}>Load more</Button>
          
        </>
      );
    }

    return null;
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
