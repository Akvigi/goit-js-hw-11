import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './fetchIMG.js';
// import { currentQuery } from './fetchIMG.js';

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

async function search(event) {
  if (event) {
    event.preventDefault();
    container.innerHTML = '';
  }
  if (searchInput.value === '') {
    Notify.failure('Please input a query');
    return;
  }
  await fetchImg().then(imgs => {
    if (imgs.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    doMarkupForImgs(imgs);
  });
  loadMore.removeAttribute('hidden');
}

form.addEventListener('submit', search);
loadMore.addEventListener('click', search);
