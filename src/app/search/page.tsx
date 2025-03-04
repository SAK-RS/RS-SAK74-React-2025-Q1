import Search from 'components/home/Search';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const { search, page } = await searchParams;
  console.log('Search Component');

  console.log({ search, page });

  return <Search />;
}
