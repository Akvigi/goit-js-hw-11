import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './fetchIMG.js';
// import { currentPage } from './fetchIMG.js';

const form = document.querySelector('.search-form');
const container = document.querySelector('.imgs-container');
const loadMore = document.querySelector('.load-more');
const searchInput = form.elements.searchQuery;

let markup;

// const changeableQuery = {
//   query: '',
//   page: 1,
// getQuery: function () {
//   return new URLSearchParams({
//     page: currentQuery.page,
//     per_page: 40,
//     key: '28235798-10089aa8a519f6d1c62a23eff',
//     q: searchInput.value,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });
// },
// };

const lightbox = new SimpleLightbox('.imgs-container .img-block a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
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

async function fetchRender() {
  await fetchImg().then(query => {
    const imgs = query.data.hits;
    if (imgs.length > 0) {
      Notify.success(`Hooray! We found ${query.data.totalHits} images.`);
    }
    if (imgs.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    doMarkupForImgs(imgs);
  });
}

async function search(event) {
  if (event) {
    event.preventDefault();
    container.innerHTML = '';
  }
  if (searchInput.value === '') {
    Notify.failure('Please input a query');
    return;
  }
  fetchRender();
  loadMore.removeAttribute('hidden');
}

async function searchMore(e) {
  e.preventDefault();
  fetchRender();
}

form.addEventListener('submit', search);
loadMore.addEventListener('click', searchMore);

// export { changeableQuery };
