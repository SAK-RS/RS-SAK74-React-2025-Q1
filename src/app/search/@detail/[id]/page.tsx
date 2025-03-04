export default async function Page({ params }: { params: { id?: string } }) {
  const { id } = await params;
  return (
    <main>
      <h1>Detail page</h1>
      <p>ID: {id}</p>
    </main>
  );
}
