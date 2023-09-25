import { fetchBreeds } from "./helpers/cat-api";
import { fetchCatByBreed } from "./helpers/cat-api";
import { Report } from 'notiflix/build/notiflix-report-aio';
// import SlimSelect from 'slim-select'


// Globale constanten
const selectPlaceholder = `<option class="js-selectOption js-placeholder-select" value="choose">Select the cat</option>`;

// Query selectors
const select = document.querySelector(".breed-select");
const catInfoCard = document.querySelector(".cat-info");
const loaderMessage = document.querySelector(".loader");
const errorMessage = document.querySelector(".error");

select.insertAdjacentHTML("afterbegin", selectPlaceholder);


loaderMessage.hidden = false;
select.hidden = true;

function markupSelect(arr) {
   return arr.map(({name, id}) => {
    return `<option class="js-selectOption" value="${id}">${name}</option>`
   }).join("");
}

fetchBreeds()
.then(data => {
    select.insertAdjacentHTML("beforeend", markupSelect(data));
    // new SlimSelect({
    //     select: '#selectElement'
    //   })
    loaderMessage.hidden = true;
    select.hidden = false;
})
.catch(err => console.log(err))

// Event listener for select
select.addEventListener("change", onChangeSelect);

function onChangeSelect() {
    catInfoCard.classList.add("cat-card");
    errorMessage.hidden = true;
    loaderMessage.hidden = false;
    select.hidden = true;
    // console.log(select.value);
   fetchCatByBreed(select.value)
   .then(data => {
    // console.log(data[0]);
    const img = data[0].url;
    const name = data[0].breeds[0].name;
    const description = data[0].breeds[0].description;
    const temperament = data[0].breeds[0].temperament;
   
catInfoCard.innerHTML = createCatCard(img, name, description, temperament);
loaderMessage.hidden = true;
select.hidden = false;
catInfoCard.classList.remove("cat-card");
})
.catch(err => {
    Report.failure(
        'Oops! Something went wrong!',
        'Please try again later',
        'Okay',
        );
    // errorMessage.hidden = false;
    loaderMessage.hidden = true;
select.hidden = false;
    console.log(err)
    catInfoCard.classList.add("cat-card");
})
}

    function createCatCard(img, name, description, temperament){

    return `<img class="js-cat-photo" src="${img}" alt="${name}" width="300">
    <div class="js-cat-description">
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p>
    </div>`;
}