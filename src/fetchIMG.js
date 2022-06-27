import * as axios from 'axios';

const form = document.querySelector('.search-form');
const searchInput = form.elements.searchQuery;
const currentQuery = {
  query: '',
  page: 0,
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

export function resetPage() {
  currentQuery.page = 0;
}

export function pageNow() {
  return currentQuery.page;
}

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
    currentQuery.query = searchInput.value;
    const query = await queryA();
    return query;
  } catch (error) {
    console.log(error.message);
  }
};
