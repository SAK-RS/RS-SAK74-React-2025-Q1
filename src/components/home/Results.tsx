'use client';

import { type FC, useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import Spinner from 'components/Spinner';
import Pagination from './Pagination';
import { useGetCharactersQuery } from 'store/apiSlice';
import { useStateSelector } from 'store';
import { selectedAmount } from 'store/selectedHeroesSlice';
import SearchError from './SearchError';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import MenuSelected from './MenuOfSelected';
const Modal = dynamic(() => import('components/Modal'), { ssr: false });

type ResultsProps = {
  search?: string;
  page?: number;
};

const Results: FC<ResultsProps> = ({ search, page = 1 }) => {
  const [totalPages, setTotalPages] = useState(1);

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

  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  const selectedLenght = useStateSelector(selectedAmount);
  const router = useRouter();
  const pathName = usePathname();

  const onPageChange = (page: number) => {
    router.push(`${pathName}?search=${search ?? ''}&page=${page}`, {
      scroll: false,
    });
    router.refresh();
  };

  return (
    <>
      {(isLoading || isFetching) && isSSR && (
        <Spinner size="large" className="my-4" />
      )}

      {isError && <SearchError error={error} />}
      {isSuccess && (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <Pagination
              className="self-start mb-4 ml-4"
              page={page}
              totalPages={totalPages}
              setPage={onPageChange}
            />
            <Link
              href={'/example'}
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
            setPage={onPageChange}
          />
        </div>
      )}

      {(isLoading || isFetching) && (
        <Modal>
          <Spinner size="large" />
        </Modal>
      )}
      {Boolean(selectedLenght) && (
        <MenuSelected
          quantity={selectedLenght}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        />
      )}
    </>
  );
};

export default Results;
