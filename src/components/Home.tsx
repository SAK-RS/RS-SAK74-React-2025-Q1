import { getCountries } from 'api/getCountries';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Country } from 'types';
import ResultsTab from './ResultsTab';
import {
  STORED_COUNTRIES_KEY,
  useStoredCountries,
} from 'hooks/useStoredCountries';
import SelectRegion from './SelectRegion';
import SearchCountry from './SearchCountry';

export type SortType = 'asc' | 'dsc';
export type SortBy = 'Name' | 'Population';

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Country['region'][]>([]);
  const [sortBy, setSortBy] = useState<undefined | SortBy>();
  const [sortDir, setSortDir] = useState<SortType | undefined>();
  const [filterByRegion, setFilterByRegion] = useState<
    undefined | Country['region']
  >();
  const [searchByName, setSearchByName] = useState<string>('');
  useEffect(() => {
    const fetch = async () => {
      try {
        const countries = await getCountries();
        setCountries(countries);
        const grupped = Object.groupBy(countries, (country) => country.region);
        setRegions(Object.keys(grupped));
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
    window.localStorage.removeItem(STORED_COUNTRIES_KEY);
  }, []);

  const sortCb = useCallback(
    (a: Country, b: Country) => {
      switch (sortBy) {
        case 'Name': {
          const sortDsc = a.name.common.localeCompare(b.name.common);
          return sortDir === 'dsc' ? sortDsc : -sortDsc;
        }
        case 'Population': {
          const sortDsc = b.population - a.population;
          return sortDir === 'dsc' ? sortDsc : -sortDsc;
        }
        default: {
          throw Error('wrong sort param');
        }
      }
    },
    [sortDir]
  );

  const { storeCountry } = useStoredCountries();

  const filteredByRegionList = useMemo(
    () =>
      countries.filter((country) =>
        filterByRegion ? country.region === filterByRegion : country
      ),
    [countries, filterByRegion]
  );
  const filteredByCountryNameList = useMemo(
    () =>
      filteredByRegionList.filter((country) =>
        searchByName
          ? country.name.common
              .toUpperCase()
              .includes(searchByName.toUpperCase())
          : country
      ),
    [filteredByRegionList, searchByName]
  );

  const onRegionChange = useCallback(
    (region: Country['region']) => {
      setFilterByRegion(region);
    },
    [setFilterByRegion]
  );
  const onNameChange = useCallback(
    (name: Country['name']['common']) => {
      setSearchByName(name);
      if (
        name &&
        filteredByCountryNameList.some(({ name: { common } }) =>
          common.toUpperCase().includes(name.toUpperCase())
        )
      ) {
        storeCountry(name);
      }
    },
    [setSearchByName, storeCountry, filteredByCountryNameList]
  );

  const sortedList = useMemo(
    () => filteredByCountryNameList.sort(sortBy && sortCb),
    [filteredByCountryNameList, sortBy, sortCb]
  );

  const setSort = useCallback(
    (param: SortBy) => {
      setSortBy(param);
    },
    [setSortBy]
  );
  const togleSortDir = useCallback(() => {
    setSortDir((prev) => (prev === 'dsc' ? 'asc' : 'dsc'));
  }, [setSortDir]);

  return (
    <>
      <div className="flex mx-auto justify-center gap-6 my-6">
        <SelectRegion {...{ regions, onRegionChange }} />
        <SearchCountry onNameChange={onNameChange} />
      </div>

      <div className="flex justify-evenly items-start">
        <ResultsTab
          countries={sortedList}
          {...{ setSort, togleSortDir }}
          {...{ sortBy, sortDir }}
        />
        <p className="flex items-center gap-2">
          <span className="inline-block w-12 h-4 outline outline-green-400 rounded-md">
            {' '}
          </span>
          <em className=""> - visited</em>
        </p>
      </div>
    </>
  );
};

export default Home;
