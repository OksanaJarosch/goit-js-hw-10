export const BASE_URL = "https://api.thecatapi.com/v1";
const ENDPOINT = "images/search";
const SEARCH_ENDPOINT = "breeds";

export function fetchBreeds(){
return fetch(`${BASE_URL}/${SEARCH_ENDPOINT}`)
.then(response => {
    if(!response.ok){
        throw new Error (response.statusText)
    }
    return response.json()
})
}


// fetchCatByBreed(breedId){

// }