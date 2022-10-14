import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

function onInput(e) {
  const value = e.target.value.trim();
  list.innerHTML = '';
  info.innerHTML = '';
  if (value.length < 1) return;
  fetchCountries(value)
    .then(res => {
      if (!res || res.length === 0) return;
      if (res.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (res.length === 1) {
        const country = res[0];
        info.innerHTML = `
          <div class="country">
            <div class="img"><img src="${country.flags.svg}"></div>
            <p class="country__title">${country.name.official}</p>
          </div>
          <div class="country__list"> 
            <p class="country__item"><span class="country__descr">Capital: </span>${
              country.capital
            }</p>
            <p class="country__item"><span class="country__descr">Population: </span>${
              country.population
            }</p>
            <p class="country__item"><span class="country__descr">Languages: </span>${Object.values(
              country.languages
            ).join(', ')}</p>
          </div>
        `;
      } else {
        list.innerHTML = res
          .map(country => {
            return `
          <li>
            <div class="img"><img src="${country.flags.svg}"></div>
            <p>${country.name.official}</p>
          </li>
        `;
          })
          .join('');
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

input.addEventListener(
  'input',
  debounce(e => onInput(e), DEBOUNCE_DELAY)
);
