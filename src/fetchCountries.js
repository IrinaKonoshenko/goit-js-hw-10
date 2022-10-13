const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  const params = 'name,capital,population,flags,languages';

  return fetch(`${BASE_URL}/${name}?fields=${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
