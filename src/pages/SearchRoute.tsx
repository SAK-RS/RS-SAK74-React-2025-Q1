import Results from 'components/home/Results';
import Search from '../components/home/Search';
import { LoaderFunctionArgs, Outlet, useNavigate } from 'react-router';
import { Route } from './+types/SearchRoute';

export const loader: (params: LoaderFunctionArgs) => LoaderDataType = ({
  request,
}: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  return { search: searchParams.get('search'), page: searchParams.get('page') };
};

type LoaderDataType = { search: string | null; page: string | null };

export default function ResultsPage({
  loaderData: { search, page },
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const onCloseDetails = () => {
    navigate({
      pathname: '/search',
      search: `search=${search || ''}&page=${page || 1}`,
    });
  };
  return (
    <>
      <section>
        <Search />
      </section>
      <div className="flex justify-between" onClick={onCloseDetails}>
        <section className="w-full">
          <Results search={search || ''} page={Number(page || '1')} />
        </section>
        <section>
          <Outlet context={{ onCloseDetails }} />
        </section>
      </div>
    </>
  );
}
