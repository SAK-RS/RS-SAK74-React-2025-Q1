import { useCallback, useSyncExternalStore } from 'react';
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
  const storage = useSyncExternalStore(subscribe, () =>
    window.localStorage.getItem(STORED_COUNTRIES_KEY)
  );
  const countries = JSON.parse(storage || 'null') as
    | Country['name']['common'][]
    | null;

  const storeCountry = useCallback(
    (country: Country['name']['common']) => {
      window.localStorage.setItem(
        STORED_COUNTRIES_KEY,
        JSON.stringify(Array.from(new Set(countries).add(country)))
      );
    },
    [countries]
  );
  return { countries: countries || [], storeCountry };
}
