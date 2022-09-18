const BASE_URL = 'https://restcountries.com/v3.1'

function fetchCountries(countries) {
    return fetch(`${BASE_URL}/name/${countries}
        `).then(response => {
            
           if ( response.status === 200 ) {
          
            return response.json();
           } 
           Notiflix.Notify.failure(` Oops, there is no country with that name`);

        })
    }; 

    export default {fetchCountries}