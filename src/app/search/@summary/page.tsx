import Results from 'components/home/Results';

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: { id?: string };
  searchParams: { search?: string; page?: string };
}) {
  const { id } = await params;
  const { search, page } = await searchParams;
  console.log({ id, search, page });

  return <Results search={search} page={page ? Number(page) : undefined} />;
}
