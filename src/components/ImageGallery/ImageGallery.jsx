import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Button} from '../Button';
import { Loader } from '../Loader';
import { fetchGalleryWithQuery } from '../../services/pixabay-api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './ImageGallery.module.scss';

export const ImageGallery = ({ query }) => {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      setStatus('pending');
      setPage(1);

      try {
        const { hits, total } = await fetchGalleryWithQuery(query, 1);

        if (total === 0) {
          const error = new Error('Sorry, there are no images matching your search query.');
          setError(error);
          setStatus('rejected');
          return;
        }

        setGallery(hits);
        setStatus('resolved');
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };

    fetchImages();
  }, [query]);

  const loadMoreHandler = async () => {
    try {
      const { hits } = await fetchGalleryWithQuery(query, page);
      setGallery(prevGallery => [...prevGallery, ...hits]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  };

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
        <div className={styles.Gallery}>
          {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              alt={tags}
              largeImage={largeImageURL}
            />
          ))}
        </div>
        <Button onClick={loadMoreHandler}>Load more</Button>
      </>
    );
  }

  return null;
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};


