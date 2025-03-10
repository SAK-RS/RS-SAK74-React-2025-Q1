import { type FC } from 'react';
import { Character } from 'types';
import { split } from 'utils/split';

const CharactersDetails: FC<{ character: Character }> = ({ character }) => {
  const { name, ...restProps } = character;

  return (
    <div className="text-left text-blue-800 animate-acordeon overflow-auto">
      <p className="text-center font-bold text-lg ">{name}</p>
      {split(restProps)}
    </div>
  );
};

export default CharactersDetails;
