import './css/styles.css';
import Notiflix from 'notiflix';
import API from "./fetchCountries";
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`)
};

function onNameCountry() {
    const countries = refs.input.value;
    if (countries === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    }
        API.fetchCountries(countries)
        .then(callCountry)
        .catch(onNameError) 
};

refs.input.addEventListener(`input`, debounce(onNameCountry, DEBOUNCE_DELAY));

function onNameError(error) {
    Notiflix.Notify.failure(` Oops, there is no country with that name`);
};

function callCountry(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
        return;
    };
    if (countries.length <= 1) {
        return createCountryInfo(countries);
    };
    if (countries.length >= 1) {
        return createCountryList(countries);
};

function createCountryInfo(countries) {
     refs.countryList.innerHTML = '';

    return countries.map(({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
    }) => {
        return refs.countryInfo.innerHTML =
            `<div><div class = "country_name">
            <img class="image_country" src=${svg}
            alt=${official}/>
            <h2>Country: ${official}</h2>
            </div>
            <p><b>Capital:</b> ${capital}</p>  
            <p><b>Population: </b> ${population}</p> 
            <p><b>Languages: </b> ${Object.values(languages)}</p>
            </div>`
    }).join(" ")
};

function createCountryList(countries) {
    refs.countryInfo.innerHTML = '';

    refs.countryList.innerHTML = countries.map(({
        name: { official },
        flags: { svg },
    }) => {
        return `<div class = "country_name">  
            <img class="image_country" src=${svg}
            alt=${official}/>
            <p>${official}</p></div>`
    }).join(" ")
    };
};