import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(countries => {
      if (countries.length >= 2 && countries.length <= 10) {
        return countries.map(({ name, flags }) => {
          const markup = `<li class="country-list__item">
        <img class="country-list__img" src="${flags.svg}" width="40" alt="${name.common}" /><span
          class="country-list__text"
        >${name.common}</span>
      </li>`;
          refs.countryList.insertAdjacentHTML('beforeend', markup);
        });
      }
      if (countries.length === 1) {
        return countries.map(
          ({ name, flags, capital, population, languages }) => {
            const markup = ` <img class="country-info__img" width="40" src="${
              flags.svg
            }" alt="${name.common}" /><span
        class="country-info__head"
      >${name.common}
      </span>
      <p class="country-info__key">Capital:<span class="country-info__value">${capital}</span></p>
      <p class="country-info__key">Population:<span class="country-info__value">${population}</span></p>
      <p class="country-info__key">Languages:<span class="country-info__value">${Object.values(
        languages
      )}</span></p>`;
            refs.countryInfo.innerHTML = markup;
          }
        );
      }
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
