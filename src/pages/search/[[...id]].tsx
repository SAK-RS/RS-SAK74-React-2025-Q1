import Details from 'components/home/Details';
import Results from 'components/home/Results';
import Search from 'components/home/Search';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function DetailedId({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, query } = useRouter();

  return (
    <section className="flex flex-col">
      <Search />

      <div
        className="flex justify-between"
        onClick={() => {
          if (location.pathname !== '/search') {
            push({
              pathname: '/search',
              query: { search: query.search, page: query.page },
            });
          }
        }}
      >
        <div className="my-6 grow">
          <Results />
        </div>
        {id && <Details id={id} />}
      </div>
    </section>
  );
}

export const getServerSideProps = (async ({ params }) => {
  return { props: { id: params.id ? params.id[0] : null } };
}) satisfies GetServerSideProps;
