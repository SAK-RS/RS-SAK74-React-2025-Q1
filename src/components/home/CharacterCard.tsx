import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useStateSelector, useTypedDispatch } from 'store';
import {
  addToSelected,
  removeFromSelected,
  selectSelectedCharactersIds,
} from 'store/selectedHeroesSlice';
import { Character } from 'types';
import { cn } from 'utils/cn';

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const dispatch = useTypedDispatch();
  const selectedIds = useStateSelector(selectSelectedCharactersIds);
  const [isSelected, setIsSelected] = useState(() =>
    selectedIds.includes(character.id)
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {}, [selectedIds]);
  return (
    <div
      className="border-2 border-primary p-4 rounded-md shadow-lg flex flex-col items-center bg-gray-100"
      data-testid="card"
    >
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
      <div className="flex justify-between w-full ">
        <Link
          className="underline text-blue-400 italic"
          to={{
            pathname: `details/${character.id}`,
            search: searchParams.toString(),
          }}
        >
          View details
        </Link>
        <div
          title={isSelected ? 'Unselect' : 'Select'}
          onClick={() => {
            dispatch(
              !isSelected
                ? addToSelected(character)
                : removeFromSelected(character.id)
            );
            setIsSelected((prev) => !prev);
          }}
        >
          <svg
            className={cn('size-6 stroke-gray-700 cursor-pointer fill-none', {
              'fill-amber-300': isSelected,
            })}
            xmlns="http://www.w3.org/2000/svg"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
