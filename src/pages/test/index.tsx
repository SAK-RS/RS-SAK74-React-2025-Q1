import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { asPath, basePath, pathname } = router;
  console.log({ asPath, basePath, pathname });

  return (
    <main>
      <div>Test page</div>
      <button
        onClick={() => {
          router.back();
        }}
      >
        Go back
      </button>
    </main>
  );
}
