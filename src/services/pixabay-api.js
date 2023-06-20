import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37169579-34487ccee730dfcb18e7032eb';

export const fetchGalleryWithQuery = async (query, page) => {
    const searchParams = new URLSearchParams({
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 6,
    });

    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
};
