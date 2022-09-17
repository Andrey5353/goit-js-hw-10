import './css/styles.css';
import './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInfo: document.querySelector('.country-info'),
    searchInput: document.querySelector('#search-box')
};


function countrieCard(countrie) {
    return countrie.map(
        ({
            flags: { svg },
            name: { official },
            capital,
            population,
            languages,
        }) => {
            return ` 
    <img src=${svg} alt="flag" width="100">
    <h2 class="country-info_name">${official}</h2>
    <p class="country-info_descr">
      Capital: <span class="country-info_value">${capital}</span>
    </p>
    <p class="country-info_descr">
      Population: <span class="country-info_value">${population}</span>
    </p>
    <p class="country-info_descr">
      Languages: <span class="country-info_value">${Object.values(languages)}</span>
    </p>`;
        }
    )
};



// function onSearch(e) {
//     e.preventDefault();
    
//     fetchCountries('usa')
//         .then(renderCountrieCard)
//         // .catch(error => console.log(error));
// };




function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            return response.json();
        })
        .then(renderCountrieCard)
}; 
    

function renderCountrieCard(countrie) {
    const markup = countrieCard(countrie);
    refs.countryInfo.innerHTML = markup;
};



// refs.searchInput.addEventListener('input', onSearch);

fetchCountries('usa')