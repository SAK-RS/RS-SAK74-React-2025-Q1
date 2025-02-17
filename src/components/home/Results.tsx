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

import { useStateSelector } from 'store';

import { selectAllSelectedCharacters } from 'store/selectedHeroesSlice';
import SearchError from './SearchError';

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
  const selected = useStateSelector(selectAllSelectedCharacters);
  useEffect(() => {
    console.log({ selected });
  }, [selected]);
  //

  return (
    <div className="my-6">
      {isError && <SearchError error={error} />}
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
};

export default Results;
