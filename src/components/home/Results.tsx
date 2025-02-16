import { type FC, useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import Spinner from 'components/Spinner';
import Pagination from './Pagination';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import { useGetCharactersQuery } from 'store/apiSlice';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useStateSelector } from 'store';
import {
  selectAllCharacters,
  selectCharactersEntities,
} from 'store/heroesSlice';
import { selectAllSelectedCharacters } from 'store/selectedHeroesSlice';
import { ErrorResponse } from 'api';

interface ResultsProps {
  search: string;
}

const Results: FC<ResultsProps> = ({ search }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isError, error, isLoading, isSuccess, isFetching } =
    useGetCharactersQuery({
      page,
      name: search,
    });

  useEffect(() => {
    if (isSuccess) {
      // totalPages.current = data.info.pages;
      setTotalPages(data.info.pages);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setSearchParams({ searchPage: page.toString() });
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [search]);

  const navigate = useNavigate();

  const location = useLocation();

  const closeDetails = () => {
    navigate({ pathname: '/search', search: searchParams.toString() });
  };

  // TODO: remove next lines:
  const stateCharacters = useStateSelector(selectAllCharacters);
  const stateEntities = useStateSelector(selectCharactersEntities);
  const selected = useStateSelector(selectAllSelectedCharacters);
  useEffect(() => {
    console.log({ stateCharacters, stateEntities, selected });
  }, [stateCharacters, selected]);
  //

  if (isError) {
    let message: string;
    console.log(error);
    switch (true) {
      case error instanceof Error:
        message = error.message;
        break;
      case isFetchBaseQueryError(error): {
        const data = isPredefinedError(error.data) ? error.data.error : '';
        message = error.status + ' ' + data;
        break;
      }
      default:
        message = 'Query error...';
    }

    return (
      <div className="text-red-500 text-2xl" data-testid="error-message">
        {message}... 😥{' '}
      </div>
    );
  } else {
    return (
      <div className="my-6">
        {isSuccess && !isLoading && !isFetching && (
          <div
            className="flex justify-between"
            onClick={() => {
              if (location.pathname !== '/search') {
                closeDetails();
              }
            }}
          >
            <div className="flex flex-col">
              <Pagination
                className="self-start mb-4 ml-4"
                page={page}
                totalPages={totalPages}
                setPage={(page) => {
                  setPage(page);
                }}
              />
              <div
                className="flex flex-wrap gap-4 justify-around"
                data-testid="list"
              >
                {data.results.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
              <Pagination
                className="self-end mt-4 mr-4"
                page={page}
                totalPages={totalPages}
                setPage={(page) => {
                  setPage(page);
                }}
              />
            </div>
            <Outlet context={{ closeDetails }} />
          </div>
        )}

        <Spinner loading={isLoading || isFetching} size="large" />
      </div>
    );
  }
};

export default Results;

function isFetchBaseQueryError(err: unknown): err is FetchBaseQueryError {
  return Boolean((err as FetchBaseQueryError).status);
}
// function errorData(err: FetchBaseQueryError): string {
//   return err.data ? (err.data as string) : '';
// }
function isPredefinedError(data: unknown): data is ErrorResponse {
  return typeof data === 'object' && data !== null && 'error' in data;
}
