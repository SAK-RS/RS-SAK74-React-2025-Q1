// import Link from 'next/link';
// import { InferGetStaticPropsType, GetStaticProps } from 'next';
// import Home from 'components/Home';
// import {
//   getCharacters,
//   getRunningQueriesThunk,
//   useGetCharactersQuery,
// } from 'store/apiSlice';
import { useRouter } from 'next/router';
// import { useStateSelector, wrapper } from 'store';
// import { useState } from 'react';
// import {
//   addToSelected,
//   selectAllSelectedCharacters,
// } from 'store/selectedHeroesSlice';

// import { results } from 'tests/mock/data.json';
import Index from 'components/Index';

export default function SSR() {
  // const [page, setPage] = useState(1);
  // // console.log('Component props', props);
  // const { data, isSuccess, isLoading } = useGetCharactersQuery({ page });
  // console.log('SSR Store:');
  // console.log({ data, isSuccess, isLoading });

  const { back } = useRouter();
  // console.log('SSR Router:');
  // console.log({ isFallback, isReady });

  // const selected = useStateSelector(selectAllSelectedCharacters);
  // console.log({ selected });

  return (
    <main>
      <div>SSR page</div>
      <Index />
      <button
        onClick={() => {
          back();
        }}
      >
        Go back
      </button>
    </main>
    // <Home />
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     console.log('Run get server props');
//     console.log('Store: ', store.getState());

//     // store.dispatch(getCharacters.initiate({}));
//     // // store.dispatch(addToSelected(results[0]));
//     // await Promise.all(store.dispatch(getRunningQueriesThunk()));
//     return { props: {} };
//   }
// );
