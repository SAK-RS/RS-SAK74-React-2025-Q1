import { getCharacters } from 'api';
import React, { useRef } from 'react';
import { Character } from 'types';
import CharacterCard from './CharacterCard';
import Spinner from 'components/Spinner';
import Pagination from './Pagination';

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

  React.useEffect(() => {
    fetchCharacters(search, page);
  }, [search, page]);

  return (
    <div className="my-6">
      {characters.length ? (
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-4 justify-around">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
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
      ) : null}

      <Spinner loading={isLoading} size="large" />
      {error && <div className="text-red-500 text-2xl">{error}... 😥 </div>}
    </div>
  );
};

export default Results;
