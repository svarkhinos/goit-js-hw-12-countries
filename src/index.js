import './css/main.css';
import fetchCountries from './js/country-service';
import countriesTpl from './templates/countriesList.hbs';
import countryTpl from './templates/country.hbs';
import { alert, defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import debounce from 'lodash.debounce';

defaults.delay = '2000';

const refs = {
    input: document.querySelector('.js-input'),
    countriesContainer: document.querySelector('.js-countries-container'),
    country: document.querySelector('.js-country'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    const query = e.target.value;
    clear();
    if (!query) {
        alert('plz, write word or letter');
        return;
    }
    fetchCountries(query)
        .then(countries => {
            if (countries.status === 404) {
                alert('there is no country with such letters');
                return;
            } else if (countries.length < 2) {
                appendCountryMarkup(countries);
            } else if (countries.length <= 10) {
                appendCountriesMarkup(countries);
            } else
                alert(
                    'Too many matches found. Please enter a more specific query!',
                );
        })
        .catch(error => alert('something wrong...'));
}

function appendCountriesMarkup(countries) {
    refs.countriesContainer.innerHTML = countriesTpl(countries);
}

function appendCountryMarkup(countries) {
    refs.country.innerHTML = countryTpl(...countries);
}

function clear() {
    refs.countriesContainer.innerHTML = '';
    refs.country.innerHTML = '';
}
