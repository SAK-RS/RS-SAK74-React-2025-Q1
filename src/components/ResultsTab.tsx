import { memo, type FC, type MouseEventHandler } from 'react';
import { Country } from 'types';
import CountryRow from './CountryRow';
import type { SortBy, SortType } from './Home';
import { useStoredCountries } from 'hooks/useStoredCountries';

type ResultTabProps = {
  countries: Country[];
  setSort: (param: SortBy) => void;
  togleSortDir: () => void;
  sortBy?: SortBy;
  sortDir?: SortType;
};

const ResultsTab: FC<ResultTabProps> = ({
  countries,
  setSort,
  togleSortDir,
  sortBy,
  sortDir,
}) => {
  const onSortClick: MouseEventHandler<HTMLElement> = ({
    currentTarget: { id },
  }) => {
    switch (id) {
      case 'name-header': {
        setSort('Name');
        togleSortDir();
        break;
      }
      case 'population-header': {
        setSort('Population');
        togleSortDir();
        break;
      }
      default:
        throw Error('Wrong sort element ID');
    }
  };
  const { countries: storedCountries } = useStoredCountries();

  return (
    <>
      <table className="border-spacing-x-6 border-spacing-y-0.5 border-separate">
        <thead>
          <tr>
            <th
              onClick={onSortClick}
              id="name-header"
              className="cursor-pointer"
            >
              <span>Name </span>
              {sortBy === 'Name' ? (
                <span>{sortDir === 'dsc' ? '⬇' : '⬆'} </span>
              ) : (
                '↕'
              )}
            </th>
            <th
              onClick={onSortClick}
              id="population-header"
              className="cursor-pointer"
            >
              <span>Population </span>
              {sortBy === 'Population' ? (
                <span>{sortDir === 'dsc' ? '⬇' : '⬆'} </span>
              ) : (
                '↕'
              )}
            </th>
            <th onClick={() => {}}>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <CountryRow
              key={country.name.common}
              country={country}
              hasVisited={storedCountries.some((storedName) =>
                country.name.common
                  .toUpperCase()
                  .includes(storedName.toLocaleUpperCase())
              )}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default memo(ResultsTab);
