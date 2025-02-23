import { type FC, useEffect, useState } from 'react';
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
import { useGetCharactersQuery } from 'store/apiSlice';
import { useStateSelector } from 'store';
import { selectedAmount } from 'store/selectedHeroesSlice';
import SearchError from './SearchError';
import MenuSelected from './MenuOfSelected';
import Modal from 'components/Modal';

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

  const selectedLenght = useStateSelector(selectedAmount);

  return (
    <div className="my-6">
      {isError && <SearchError error={error} />}
      {isSuccess && (
        <div
          className="flex justify-between"
          onClick={() => {
            if (location.pathname !== '/search') {
              closeDetails();
            }
          }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <Pagination
                className="self-start mb-4 ml-4"
                page={page}
                totalPages={totalPages}
                setPage={(page) => {
                  setPage(page);
                }}
              />
              <Link
                to="../example"
                onClick={(ev) => {
                  ev.stopPropagation();
                }}
                className="mr-4"
              >
                Go to another page
              </Link>
            </div>

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
          {Boolean(selectedLenght) && (
            <MenuSelected quantity={selectedLenght} />
          )}
        </div>
      )}

      {(isLoading || isFetching) && (
        <Modal>
          <Spinner size="large" />
        </Modal>
      )}
    </div>
  );
};

export default Results;
