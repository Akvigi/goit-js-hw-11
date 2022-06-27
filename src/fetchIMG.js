// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as axios from 'axios';
import { changeableQuery } from './index.js';

const form = document.querySelector('.search-form');
const searchInput = form.elements.searchQuery;
const currentQuery = {
  query: '',
  page: 1,
  getQuery: function () {
    return new URLSearchParams({
      page: (currentQuery.page += 1),
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
    // if (event) {
    //   event.preventDefault();
    //   container.innerHTML = '';
    // }
    // currentQuery.page += 1;
    currentQuery.query = searchInput.value;
    const query = await queryA();
    return query;
  } catch (error) {
    console.log(error.message);
  }
};

// export { currentQuery } from './fetchIMG.js';
