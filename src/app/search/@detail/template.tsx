'use client';

import { usePathname } from 'next/navigation';

export default function DetailsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log({ children });
  const pathname = usePathname();
  return <>{/\/\d/g.test(pathname) && children}</>;
}
