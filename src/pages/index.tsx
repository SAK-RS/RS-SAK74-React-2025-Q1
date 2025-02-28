import Link from 'next/link';

import Index from 'components/Index';

export default function Home() {
  // console.log('Component props', props);

  return (
    <main className="text-red-300">
      <h2>Hello from index</h2>
      <nav className="space-x-6 *:cursor-pointer">
        <Link href={{ pathname: 'test', query: { asd: 'qwe' } }}>
          Go to test page
        </Link>
        <Link href={'ssr'}>SSR</Link>
        <Index />
      </nav>
    </main>
  );
}

// export const getStaticProps = ((context) => {
//   // console.log('Context in static props: ', context);

//   return {
//     props: {
//       data: 'index props',
//     },
//   };
// }) satisfies GetStaticProps<{
//   data: 'index props';
// }>;
