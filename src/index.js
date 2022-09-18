import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInfo: document.querySelector('.country-info'),
    searchList: document.querySelector('.country-list'),
    searchInput: document.querySelector('#search-box'),
};



// получае значения со строки поиска
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    fetchCountries(refs.searchInput.value)
}



// рендерим список или карточку

// список
function renderCountrieList(countrie) {
    const markup = countrieSearch(countrie);
    refs.searchList.innerHTML = markup;
}

function countrieSearch(countrie) {
    return countrie.map(
        ({
            flags: { svg },
            name: { official },
        }) => {
            return `<li class="country-list"><img src=${svg} alt="flag" width="40"
    <h2 class="country-info_name">  ${official}</h2></li>`
        }
    ).join('')
};

// карточка
function renderCountrieCard(countrie) {
    const markup = countrieCard(countrie);
    refs.countryInfo.innerHTML = markup;
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
    ).join('')
};


// делаем запрос на сервер

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            return response.json();
        })
        .then(renderCardOrList)
}; 
    

function renderCardOrList(countrie) {
    countrie.length === 1 ? renderCountrieCard(countrie) : renderCountrieList(countrie)
};

