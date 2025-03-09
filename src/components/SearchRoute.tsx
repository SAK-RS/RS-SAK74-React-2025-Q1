import Results from 'components/home/Results';
import Search from './home/Search';
import { Route } from './+types/SearchRoute';
import { LoaderFunction } from 'react-router';

export const loader: LoaderFunction = ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  return { search: searchParams.get('search'), page: searchParams.get('page') };
};

type LoaderDataType = { search?: string; page?: string };

export default function ResultsPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <section>
        <Search />
      </section>
      <section>
        <Results
          search={(loaderData as unknown as LoaderDataType).search}
          page={Number((loaderData as unknown as LoaderDataType).page || '1')}
        />
      </section>
    </>
  );
}
