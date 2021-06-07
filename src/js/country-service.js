export default function fetchCountries(query) {
    const url = `https://restcountries.eu/rest/v2/name/${query}`;

    return fetch(url).then(response => response.json());
}
