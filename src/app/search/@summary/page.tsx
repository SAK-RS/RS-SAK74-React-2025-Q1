export default async function Results({
  params,
  searchParams,
}: {
  params: { id?: string };
  searchParams: { search?: string; page?: string };
}) {
  const { id } = await params;
  const { search, page } = await searchParams;
  console.log({ id, search, page });

  return (
    <section>
      <h1>Summary page</h1>
      <p>
        search: {search}, page: {page}
      </p>
      {/* <Search /> */}
    </section>
  );
}
