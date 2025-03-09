import Search from 'components/home/Search';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  return <Search search={search} />;
}
