import { type FC, useEffect, useState } from 'react';
import { Character } from 'types';
import { cn } from 'utils/cn';
import { split } from 'utils/split';

const CharactersDetails: FC<{ character: Character }> = ({ character }) => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    setIsOpened(true);
  }, []);
  const { name, ...restProps } = character;

  return (
    <div
      className={cn(
        'text-left text-blue-800 w-0 transition-[width] duration-500 ease-in-out',
        {
          'w-full': isOpened,
        }
      )}
    >
      <p className="text-center font-bold text-lg ">{name}</p>
      {split(restProps)}
    </div>
  );
};

export default CharactersDetails;
