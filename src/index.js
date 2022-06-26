import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { axios } from 'axios';
import * as axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const container = document.querySelector('.imgs-container');
const loadMore = document.querySelector('.load-more');
const searchInput = form.elements.searchQuery;
let markup;

const lightbox = new SimpleLightbox('.imgs-container .img-block a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const currentQuery = {
  query: '',
  page: 1,
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

// console.log(currentQuery.getQuery().toString());

const searchParams = new URLSearchParams({
  key: '28235798-10089aa8a519f6d1c62a23eff',
  q: searchInput.value,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

function doMarkupForImgs(items) {
  markup = items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class='img-block'>
                     <a href="${largeImageURL}"><img class= "img-item" src="${webformatURL}" alt="${tags}" loading="lazy"></a>
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>
                                ${likes}
                            </p>
                            <p class="info-item">
                                <b>Views</b>
                                ${views}
                            </p>
                            <p class="info-item">
                                <b>Comments</b>
                                ${comments}
                            </p>
                            <p class="info-item">
                                <b>Downloads</b>
                                ${downloads}
                            </p>
                        </div>
                </div> `;
      }
    )
    .join('');
  container.insertAdjacentHTML('beforeEnd', markup);
  lightbox.refresh();
}

const fetchImg = async () => {
  try {
    const now = currentQuery.getQuery().toString();
    // const all = searchParams.toString();
    const query = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?${now}`,
    });
    // const queryAll = await axios({
    //   method: 'get',
    //   url: `https://pixabay.com/api/?${all}`,
    // });
    console.log(query);
    const imgs = await query.data.hits;
    if (imgs.length > 0) {
      Notify.success(`Hooray! We found ${query.data.totalHits} images.`);
    }
    return imgs;
  } catch (error) {
    console.log(error.message);
  }
};

async function search(event) {
  if (event) {
    event.preventDefault();
    container.innerHTML = '';
  }
  currentQuery.query = searchInput.value;
  await fetchImg().then(imgs => {
    if (imgs.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    doMarkupForImgs(imgs);
  });
}

form.addEventListener('submit', search);
loadMore.addEventListener('click', () => {
  currentQuery.page += 1;
  search();
});
