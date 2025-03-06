import Results from 'components/home/Results';

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const { search, page } = await searchParams;

  return <Results search={search} page={page ? Number(page) : undefined} />;
}
