// import { Notify } from 'notiflix/build/notiflix-notify-aio'


const form = document.querySelector(".search-form");
const container = document.querySelector(".img-container");

const search = form.elements.searchQuery
let markup;

console.log(search);

const fetchImg = async () => {
    const query = await fetch(`https://restcountries.com/v3.1/name/${search.value}`)
    const imgs = await response.json()
    return console.log(imgs)
}
// const query = async () => {
//     return fetchImg().then(imgs => console.log(imgs))
// }

search.addEventListener("keydown", () => console.log(search.value))
