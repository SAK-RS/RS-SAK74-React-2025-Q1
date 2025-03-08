import Details from 'components/home/Details';

export default async function Page({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
}) {
  const { id } = params;
  return <Details id={id} />;
}
