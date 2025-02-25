import Link from 'next/link';
import { InferGetStaticPropsType, GetStaticProps } from 'next';

export default function Index({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ data });

  return (
    <main className="text-red-300">
      <h2>Hello from index</h2>
      <Link href={{ pathname: 'test', query: { asd: 'qwe' } }}>
        Go to test page
      </Link>
    </main>
  );
}

export const getStaticProps = ((context) => {
  console.log('Context in static props: ', context);

  return {
    props: {
      data: 'index props',
    },
  };
}) satisfies GetStaticProps<{
  data: 'index props';
}>;
