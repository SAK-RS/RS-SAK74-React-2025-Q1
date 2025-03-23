import type { FC, MouseEventHandler } from 'react';
import { Country } from 'types';
import CountryRow from './CountryRow';
import type { SortBy, SortType } from './Home';

type ResultTabProps = {
  countries: Country[];
  setSortBy: (param: SortBy) => void;
  togleSortDir: () => void;
  sortBy?: SortBy;
  sortDir?: SortType;
};

const ResultsTab: FC<ResultTabProps> = ({
  countries,
  setSortBy,
  togleSortDir,
  sortBy,
  sortDir,
}) => {
  const onSortClick: MouseEventHandler<HTMLElement> = ({
    currentTarget: { id },
  }) => {
    switch (id) {
      case 'name-header': {
        setSortBy('Name');
        togleSortDir();
        break;
      }
      case 'population-header': {
        setSortBy('Population');
        togleSortDir();
        break;
      }
      default:
        throw Error('Wrong sort element ID');
    }
  };
  return (
    <>
      <table className="border-spacing-6 border-separate">
        <thead>
          <tr>
            <th
              onClick={onSortClick}
              id="name-header"
              className="cursor-pointer"
            >
              <span>Name</span>
              {sortBy === 'Name' && (
                <span> {sortDir === 'dsc' ? '⬇' : '⬆'} </span>
              )}
            </th>
            <th
              onClick={onSortClick}
              id="population-header"
              className="cursor-pointer"
            >
              <span>Population</span>
              {sortBy === 'Population' && (
                <span> {sortDir === 'dsc' ? '⬇' : '⬆'} </span>
              )}
            </th>
            <th onClick={() => {}}>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <CountryRow key={country.name.common} country={country} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ResultsTab;
