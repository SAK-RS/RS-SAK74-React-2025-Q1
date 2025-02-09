import { getCharacterById } from 'api';
import Button from 'components/Button';
import DetailsPage from 'components/home/CharactersDetails';
import Spinner from 'components/Spinner';
import { Suspense, useEffect, useState } from 'react';
import {
  useLoaderData,
  useOutletContext,
  type LoaderFunction,
} from 'react-router';
import { Character } from 'types';
import { cn } from 'utils/cn';

export const loader: LoaderFunction = async ({ params }) => {
  const characterID = params.detailsID;
  if (!characterID) {
    throw new Error('Character ID is required');
  }
  const character = getCharacterById(characterID);
  return {
    characterPromise: character,
  };
};

export const Details = () => {
  const { characterPromise } = useLoaderData<{
    characterPromise: Promise<Character>;
    character: Character;
  }>();
  const [isOpened, setIsOpened] = useState(false);

  const { closeDetails } = useOutletContext<{ closeDetails: () => void }>();
  useEffect(() => {
    setIsOpened(true);
  }, []);

  return (
    <div
      className={cn(
        'w-0 h-full bg-gray-400 text-gray-600 transition-[width] duration-1000 ease-in-out border border-primary rounded-sm py-4 relative',
        {
          'w-full': isOpened,
        }
      )}
    >
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={closeDetails}
      >
        ❌
      </div>
      <p className="font-lg">Details:</p>
      <Suspense fallback={<Spinner />}>
        <DetailsPage characterPromise={characterPromise} />
      </Suspense>
      <Button onClick={closeDetails} size="small" className="my-2">
        Close
      </Button>
    </div>
  );
};
