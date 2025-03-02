import Button from 'components/Button';
import DetailsPage from 'components/home/CharactersDetails';
import Spinner from 'components/Spinner';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
// import {
//   useLoaderData,
//   useOutletContext,
//   type LoaderFunction,
// } from 'react-router';
import { useGetCharacterByIdQuery } from 'store/apiSlice';
import { cn } from 'utils/cn';

// export const loader: LoaderFunction = async ({ params }) => {
//   const characterID = params.detailsID;
//   if (!characterID) {
//     throw new Error('Character ID is required');
//   }
//   return characterID;
// };

const Details: FC<{ id: string }> = ({ id }) => {
  // const id = useLoaderData<string>();
  const [isOpened, setIsOpened] = useState(false);

  const { data, isSuccess, isLoading, isFetching } =
    useGetCharacterByIdQuery(id);

  const { push, query } = useRouter();

  const closeDetails = () => {
    push({
      pathname: '/search',
      query,
    });
  };

  useEffect(() => {
    setIsOpened(true);
  }, []);

  return (
    <div
      className={cn(
        'w-0 h-full bg-gray-400 text-gray-600 transition-[width] duration-1000 ease-in-out border border-primary rounded-sm py-4 mt-4 relative',
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
