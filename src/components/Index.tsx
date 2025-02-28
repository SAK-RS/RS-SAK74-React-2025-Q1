import { useGetCharactersQuery } from 'store/apiSlice';
import { useRouter } from 'next/router';
import { useStateSelector, useTypedDispatch } from 'store';
import {
  addToSelected,
  removeFromSelected,
  selectAllSelectedCharacters,
} from 'store/selectedHeroesSlice';
import { useEffect, useState } from 'react';

import { results } from 'tests/mock/data.json';

const getRandomMockedCharacter = () => results[Math.round(Math.random() * 6)];

export default function Index() {
  // console.log('Component props', props);

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetCharactersQuery({
    page,
  });

  useEffect(() => {
    console.log('Store data:');
    console.log({ data });
  }, [data]);
  useEffect(() => {
    console.log('Store loading:');
    console.log({ isLoading });
  }, [isLoading]);
  useEffect(() => {
    console.log('Store fetching:');
    console.log({ isFetching });
  }, [isFetching]);

  const { isFallback, isReady } = useRouter();

  useEffect(() => {
    console.log('Router:');
    console.log({ isFallback, isReady });
  }, [isFallback, isReady]);

  const selected = useStateSelector(selectAllSelectedCharacters);
  useEffect(() => {
    console.log({ selected });
  }, [selected]);

  const getRandomSelected = () =>
    selected[Math.round(Math.random() * selected.length - 1)];

  const dispatch = useTypedDispatch();

  return (
    <main className="text-red-300">
      <button
        className="block"
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        Next page
      </button>
      <div className="space-x-4">
        <button
          onClick={() => {
            console.log('Click');

            dispatch(addToSelected(getRandomMockedCharacter()));
          }}
        >
          Add to selected
        </button>
        <button
          onClick={() => {
            dispatch(removeFromSelected(getRandomSelected().id));
          }}
        >
          Remove from selected
        </button>
      </div>
    </main>
  );
}
