import Button from 'components/Button';
import DetailsPage from 'components/home/CharactersDetails';
import Spinner from 'components/Spinner';
import type { FC } from 'react';
import { useOutletContext } from 'react-router';

import { useGetCharacterByIdQuery } from 'store/apiSlice';

const Details: FC<{ id: string }> = ({ id }) => {
  const { data, isSuccess, isLoading, isFetching } =
    useGetCharacterByIdQuery(id);
  const { onCloseDetails } = useOutletContext<{ onCloseDetails: () => void }>();

  return (
    <div
      className="bg-gray-400 text-gray-600 border border-primary rounded-sm pb-4 relative animate-acordeon"
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={onCloseDetails}
      >
        ❌
      </div>
      <h2 className="font-lg text-gray-200 bg-gray-500 py-2">Details:</h2>
      <Spinner loading={isLoading || isFetching} />
      {isSuccess && <DetailsPage character={data} />}
      <Button onClick={onCloseDetails} size="small" className="my-2">
        Close
      </Button>
    </div>
  );
};

export default Details;
