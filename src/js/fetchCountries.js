import Notiflix from 'notiflix';
import API from "./api-service";
import getRefs from "./getRefs";

const refs = getRefs()

let debounce = require('lodash.debounce');

function onNameCountry() {
   
    const countries = refs.input.value.trim();
   
    API.fetchCountries(countries)
    .then(callCountry)
    .catch(onNameError)    
}

refs.input.addEventListener(`input`, debounce(onNameCountry, 300));

function onNameError(error) {
   
   Notiflix.Notify.failure(` Oops, there is no country with that name`);
   
}
function callCountry(countries) {
    
    if (countries.length > 10) {
        Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');

        return;
    };
    if (countries.length <= 1){
        console.log("ok")
         return countries.map(({capital, population, flags: 
           {svg}, languages, name:{official}}) => {
            return   refs.countryList.innerHTML = `<div><div class = "country_name">  
                                 
               <img class="image_country" src=${svg}
                alt=${official}
                width="80" heighth="50"
                />
                <h2>Country: ${official}</h2>
                </div>
                <p><b>Capital:</b> ${capital}</p>  
                <p><b>Population: </b> ${population}</p> 
                <p><b>Languages: </b> ${Object.values(languages)}</p>
                </div>` 
                
            }).join("  ")
        
  
       
    };
   console.log("10")
    const makeUp = countries.map((country) => {
        return   `<div class = "country_name">  
        <img class="image_country" src=${country.flags.svg}
        alt=${country.name.official}
        width="60" 
        />
        <p>${country.name.official}</p>   
       </div>`
      
           
        }).join("")
        refs.countryList.innerHTML = makeUp;
console.log(makeUp)

    
    console.log("ok")
   

    
   }
   function countryCart(countries) {

    
   }
  
//    if (countries.length === 1) {
//     return   `<div class = "country_cart">  
    
//     <p>capital: ${country.capital}</p>  
//     <p>population: ${country.population}</p> 

//     <p>${country.languages}</p> 
//     <img class="image_countryCart" src=${country.flags.svg}
//     alt=${country.name.official}
//     width="80" heighth="50"
//     />
//    </div>`
   
   
   


// function countryCart(countries) {
//     return  refs.countryList.innerHTML = `<div class = "country_cart">  
    
//     <p>capital: ${country.capital}</p>  
//     <p>population: ${country.population}</p> 

//     <p>${country.languages}</p> 
//     <img class="image_countryCart" src=${country.flags.svg}
//     alt=${country.name.official}
//     width="80" heighth="50"
//     />
//    </div>`
// }