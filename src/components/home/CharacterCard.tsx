import { FC } from 'react';
import { Character } from 'types';

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  return (
    <div className="border-2 border-primary p-4 rounded-md shadow-lg flex flex-col items-center bg-gray-100">
      <img
        src={character.image}
        alt={character.name}
        className="w-24 h-24 rounded-full mb-4"
        loading="lazy"
      />
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Status:</strong> {character.status}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Species:</strong> {character.species}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Type:</strong> {character.type}
      </p>
      <p className="text-gray-600">
        <strong>Gender:</strong> {character.gender}
      </p>
    </div>
  );
};

export default CharacterCard;
