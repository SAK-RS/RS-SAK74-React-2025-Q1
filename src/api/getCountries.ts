import { Country } from 'types';

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,population,region,flags';

export const getCountries: () => Promise<Country[]> = async () => {
  const resp = await fetch(API_URL);
  if (!resp.ok) {
    throw Error(resp.status + ' ' + resp.statusText);
  }
  return await resp.json();
};
