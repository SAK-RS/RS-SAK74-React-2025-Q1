'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <main>
      <h1>Test page</h1>
      <button
        onClick={() => {
          router.back();
        }}
        className="cursor-pointer"
      >
        Go back
      </button>
    </main>
  );
}
