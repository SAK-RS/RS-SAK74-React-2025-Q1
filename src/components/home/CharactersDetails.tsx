import { FC, use, useEffect, useState } from 'react';
import { Character } from 'types';
import { cn } from 'utils/cn';
import { split } from 'utils/split';

const CharactersDetails: FC<{ characterPromise: Promise<Character> }> = ({
  characterPromise,
}) => {
  const character = use(characterPromise);

  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    setIsOpened(true);
  }, []);

  return (
    <div
      className={cn(
        'text-left text-blue-800 w-0 transition-[width] duration-500 ease-in-out',
        {
          'w-full': isOpened,
        }
      )}
    >
      <p className="text-center font-bold text-lg ">{character.name}</p>
      {split(character)}
    </div>
  );
};

export default CharactersDetails;
