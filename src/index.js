import axios from "axios";
import { fetchBreeds } from "./helpers/cat-api";

axios.defaults.headers.common["x-api-key"] = "live_Luv3WqWjgqS027nk6cq78VcSpdK30ZZfuGi6yp6MDvY55qKhq1CZWlAnFh8nf7vz";

const selectPlaceholder = `<option class="js-selectOption" value="choose">Select the cat</option>`;
let query = "";

const select = document.querySelector(".breed-select");

select.addEventListener("change", onChangeSelect);

select.insertAdjacentHTML("afterbegin", selectPlaceholder);

function markupSelect(arr) {
   return arr.map(({name, id}) => {
    return `<option class="js-selectOption" value="${id}">${name}</option>`
   }).join("");
}

fetchBreeds()
.then(data => {
    select.insertAdjacentHTML("beforeend", markupSelect(data))
})
.catch(err => console.log(err))

function onChangeSelect() {
    query = select.value;
    // console.log(query)
}