// import { Notify } from 'notiflix/build/notiflix-notify-aio'


const form = document.querySelector(".search-form");
const container = document.querySelector(".img-container");

const searchInput = form.elements.searchQuery
let markup;

const searchParams = new URLSearchParams({
    page: 1,
    per_page: 20,
    key: "28235798-10089aa8a519f6d1c62a23eff",
    q: searchInput.value, 
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
})

function doMarkupForImgs(items) {
    markup = items.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>{
        return `<div class='img-block'>
                    <img src="${webformatURL}" alt="${tags}" loading="lazy">
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
    }).join('')
};

;

const fetchImg = async () => {
    const query = await fetch(`https://pixabay.com/api/${searchParams}`)
    const imgs = await query.json()
    if (!imgs.ok) {
        throw new Error(imgs.status);
    }
    return imgs
}

function search() {
    container.innerHTML = ""
    fetchImg().then( imgs => { 
        doMarkupForImgs(imgs)
    })
}

// const query = async () => {
//   try {
//
//     const users = await fetchImg();
//     console.log(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

form.addEventListener("submit", fetchImg)
