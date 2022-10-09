import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(onInputNameCountry, DEBOUNCE_DELAY)
);

function onInputNameCountry() {
  if (refs.input.value.trim()) {
    const inputValueTrim = refs.input.value.trim();
    fetchCountries(inputValueTrim);
  }
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
