import './css/main.css';
import fetchCountries from './js/country-service';
import countriesTpl from './templates/countriesList.hbs';
import countryTpl from './templates/country.hbs';
import { alert, defaultModules, defaultStack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const { defaults } = require('@pnotify/core');
defaults.delay = '2000';
defaults.sticker = false;

const refs = {
    input: document.querySelector('.js-input'),
    countriesContainer: document.querySelector('.js-countries-container'),
    country: document.querySelector('.js-country'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    const query = e.target.value;
    clear();

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
        .catch(error => alert('plz, write word or letter'));
}

function appendCountriesMarkup(countries) {
    refs.countriesContainer.insertAdjacentHTML(
        'beforeend',
        countriesTpl(countries),
    );
}

function appendCountryMarkup(countries) {
    refs.country.insertAdjacentHTML('beforeend', countryTpl(...countries));
}

function clear() {
    refs.countriesContainer.innerHTML = '';
    refs.country.innerHTML = '';
}
