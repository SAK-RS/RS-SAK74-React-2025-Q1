import { getCountries } from 'api/getCountries';
import { useEffect, useState } from 'react';
import type { Country } from 'types';
import ResultsTab from './ResultsTab';
import ControlPanel from './ControlPanel';

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
        // TODO: set regions from API
        // const grupped = Object.groupBy(countries, (country) => country.region);
        // setRegions(Object.keys(grupped));
        setRegions([
          'Antarctic',
          'Americas',
          'Europe',
          'Africa',
          'Asia',
          'Oceania',
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const sortCb = (a: Country, b: Country) => {
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
  };

  return (
    <>
      <ControlPanel
        regions={regions}
        selectedRegion={filterByRegion}
        onRegionChange={(region) => {
          setFilterByRegion(region);
        }}
        searchByName={searchByName}
        onNameChange={(name) => {
          setSearchByName(name);
        }}
      />
      <ResultsTab
        countries={countries
          .slice(0, 10)
          .filter((country) =>
            filterByRegion ? country.region === filterByRegion : country
          )
          .filter((country) =>
            searchByName
              ? country.name.common
                  .toUpperCase()
                  .includes(searchByName.toUpperCase())
              : country
          )
          .sort(sortBy && sortCb)}
        setSortBy={(param) => setSortBy(param)}
        togleSortDir={() =>
          setSortDir((prev) => (prev === 'dsc' ? 'asc' : 'dsc'))
        }
        {...{ sortBy, sortDir }}
      />
    </>
  );
};

export default Home;
