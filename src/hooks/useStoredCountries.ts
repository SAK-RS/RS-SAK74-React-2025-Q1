import { useSyncExternalStore } from 'react';
import { Country } from 'types';

export const STORED_COUNTRIES_KEY = 'stored-countries';

function subscribe(cb: () => void) {
  const callback = (ev: StorageEvent) => {
    if (ev.key === STORED_COUNTRIES_KEY) {
      cb();
    }
  };
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function useStoredCountries() {
  const storedContries = useSyncExternalStore(subscribe, () =>
    window.localStorage.getItem(STORED_COUNTRIES_KEY)
  );
  const countries = JSON.parse(
    storedContries || '[]'
  ) as Country['name']['common'][];
  const storeCountry = (country: Country['name']['common']) => {
    window.localStorage.setItem(
      STORED_COUNTRIES_KEY,
      JSON.stringify([...countries, country])
    );
  };
  return { countries, storeCountry };
}
