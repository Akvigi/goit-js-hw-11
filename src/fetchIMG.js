import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as axios from 'axios';
// import { searchInput } from './index.js';

const form = document.querySelector('.search-form');
const searchInput = form.elements.searchQuery;
const currentQuery = {
  query: '',
  page: 0,
  getQuery: function () {
    return new URLSearchParams({
      page: currentQuery.page,
      per_page: 40,
      key: '28235798-10089aa8a519f6d1c62a23eff',
      q: searchInput.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
  },
};

async function queryA() {
  const now = currentQuery.getQuery().toString();
  const query = await axios({
    method: 'get',
    url: `https://pixabay.com/api/?${now}`,
  });
  return query;
}

export const fetchImg = async () => {
  try {
    currentQuery.page += 1;
    currentQuery.query = searchInput.value;
    const query = await queryA();
    const imgs = await query.data.hits;
    if (imgs.length > 0) {
      Notify.success(`Hooray! We found ${query.data.totalHits} images.`);
    }
    return imgs;
  } catch (error) {
    console.log(error.message);
  }
};

// export { currentQuery } from './fetchIMG.js';
