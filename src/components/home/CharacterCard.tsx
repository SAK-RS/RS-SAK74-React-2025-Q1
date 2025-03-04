import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';
import { useStateSelector, useTypedDispatch } from 'store';
import {
  addToSelected,
  removeFromSelected,
  selectSelectedCharactersIds,
} from 'store/selectedHeroesSlice';
import type { Character } from 'types';
import { cn } from 'utils/cn';

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const dispatch = useTypedDispatch();
  const selectedIds = useStateSelector(selectSelectedCharactersIds);

  const isSelected = selectedIds.includes(character.id);

  return (
    <div
      className="border-2 border-primary p-4 rounded-md shadow-lg flex flex-col items-center bg-gray-100 dark:bg-gray-600"
      data-testid="card"
    >
      <Image
        src={character.image}
        alt={character.name}
        width={96}
        height={96}
        className="rounded-full mb-4"
        loading="lazy"
      />
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <div className="space-y-1 text-gray-600 dark:text-gray-300">
        <p className="">
          <strong>Status:</strong> {character.status}
        </p>
        <p className="">
          <strong>Species:</strong> {character.species}
        </p>
        <p className="">
          <strong>Type:</strong> {character.type}
        </p>
        <p className="">
          <strong>Gender:</strong> {character.gender}
        </p>
      </div>
      <div
        className="flex justify-between w-full"
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        <Link
          className="underline text-blue-400 italic hover:not-italic hover:font-semibold"
          href={{
            pathname: `/search/${character.id}`,
            // todo: maintain query params

            // query: { search: query.search, page: query.page },
          }}
          scroll={false}
        >
          View details
        </Link>
        <button
          title={isSelected ? 'Unselect' : 'Select'}
          onClick={() => {
            dispatch(
              !isSelected
                ? addToSelected(character)
                : removeFromSelected(character.id)
            );
          }}
        >
          <svg
            className={cn(
              'size-6 stroke-gray-700 dark:stroke-gray-400 cursor-pointer fill-none hover:scale-105',
              {
                'fill-amber-300': isSelected,
              }
            )}
            xmlns="http://www.w3.org/2000/svg"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
