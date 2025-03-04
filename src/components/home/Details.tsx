'use client';

import Button from 'components/Button';
import DetailsPage from 'components/home/CharactersDetails';
import Spinner from 'components/Spinner';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { useGetCharacterByIdQuery } from 'store/apiSlice';
import { cn } from 'utils/cn';

const Details: FC<{ id: string }> = ({ id }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { data, isSuccess, isLoading, isFetching } =
    useGetCharacterByIdQuery(id);

  const router = useRouter();
  const closeDetails = () => {
    router.push('/search');
    router.refresh();
  };

  useEffect(() => {
    setIsOpened(true);
  }, []);

  return (
    <div
      className={cn(
        'w-20 h-full bg-gray-400 text-gray-600 transition-[width] duration-1000 ease-in-out border border-primary rounded-sm py-4 mt-4 relative',
        {
          'w-full max-w-lg': isOpened,
        }
      )}
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={closeDetails}
      >
        ❌
      </div>
      <p className="font-lg">Details:</p>
      <Spinner loading={isLoading || isFetching} />
      {isSuccess && <DetailsPage character={data} />}
      <Button onClick={closeDetails} size="small" className="my-2">
        Close
      </Button>
    </div>
  );
};

export default Details;
