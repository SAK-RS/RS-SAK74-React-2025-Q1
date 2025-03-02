import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  return (
    <main>
      <h1>Test page</h1>
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
