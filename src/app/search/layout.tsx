'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Layout({
  children,
  summary,
  detail,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  detail: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <>
      <section>{children}</section>
      <div
        className="flex justify-between"
        onClick={() => {
          router.push(`/search?${searchParams.toString()}`);
          router.refresh();
        }}
      >
        <section className="w-full">{summary}</section>
        <section>{detail}</section>
      </div>
    </>
  );
}
