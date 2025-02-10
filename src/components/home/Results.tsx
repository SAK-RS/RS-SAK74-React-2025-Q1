import { getCharacters } from 'api';
import React, { useEffect, useRef } from 'react';
import { Character } from 'types';
import CharacterCard from './CharacterCard';
import Spinner from 'components/Spinner';
import Pagination from './Pagination';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';

interface ResultsProps {
  search: string;
}

const Results: React.FC<ResultsProps> = ({ search }) => {
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [page, setPage] = React.useState(1);
  const totalPages = useRef(1);

  const fetchCharacters = async (search: string, page?: number) => {
    setCharacters([]);
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await getCharacters({ name: search, page });
      const {
        results: characters,
        info: { pages },
      } = response;
      setCharacters(characters);
      totalPages.current = pages;
    } catch (err) {
      if (typeof err === 'string') {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ searchPage: page.toString() });
    fetchCharacters(search, page);
  }, [search, page]);

  const navigate = useNavigate();

  const location = useLocation();

  const closeDetails = () => {
    navigate({ pathname: '/search', search: searchParams.toString() });
  };

  return (
    <div className="my-6">
      {characters.length ? (
        <div
          className="flex justify-between"
          onClick={() => {
            if (location.pathname !== '/search') {
              closeDetails();
            }
          }}
        >
          <div className="flex flex-col">
            <div
              className="flex flex-wrap gap-4 justify-around"
              data-testid="list"
            >
              {characters.map((character) => (
                <Link
                  key={character.id}
                  to={{
                    pathname: `details/${character.id}`,
                    search: searchParams.toString(),
                  }}
                  onClick={() => {
                    // ev.stopPropagation();
                  }}
                  data-testid="card"
                >
                  <CharacterCard character={character} />
                </Link>
              ))}
            </div>
            <Pagination
              className="self-start ml-4"
              page={page}
              totalPages={totalPages.current}
              setPage={(page) => {
                setPage(page);
              }}
            />
          </div>
          <Outlet context={{ closeDetails }} />
        </div>
      ) : null}

      <Spinner loading={isLoading} size="large" />
      {error && (
        <div className="text-red-500 text-2xl" data-testid="error-message">
          {error}... 😥{' '}
        </div>
      )}
    </div>
  );
};

export default Results;
