!function(){var n={countryInfo:document.querySelector(".country-info"),searchInput:document.querySelector("#search-box")};function c(c){var a=function(n){return n.map((function(n){var c=n.flags.svg,a=n.name.official,o=n.capital,t=n.population,s=n.languages;return" \n    <img src=".concat(c,' alt="flag" width="100">\n    <h2 class="country-info_name">').concat(a,'</h2>\n    <p class="country-info_descr">\n      Capital: <span class="country-info_value">').concat(o,'</span>\n    </p>\n    <p class="country-info_descr">\n      Population: <span class="country-info_value">').concat(t,'</span>\n    </p>\n    <p class="country-info_descr">\n      Languages: <span class="country-info_value">').concat(Object.values(s),"</span>\n    </p>")}))}(c);n.countryInfo.innerHTML=a}fetch("https://restcountries.com/v3.1/name/".concat("usa")).then((function(n){return n.json()})).then(c)}();
//# sourceMappingURL=index.a4aaf359.js.map
