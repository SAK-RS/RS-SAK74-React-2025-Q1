export default function Ssr({ data }: { data: string }) {
  console.log({ data });

  return <main>SSR</main>;
}

export function getServerSideProps() {
  return { props: { data: 'ssr' } };
}
