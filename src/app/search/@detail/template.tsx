'use client';

import { usePathname } from 'next/navigation';

export default function DetailsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/search' && (
        <div className="w-md sticky top-16">{children}</div>
      )}
    </>
  );
}
