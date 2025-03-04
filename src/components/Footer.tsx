'use client';

import { cn } from 'utils/cn';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

export default function Footer() {
  const { isDark } = useTheme();
  return (
    <footer
      className={cn(
        'border-t flex justify-between items-center py-1 px-4 bg-gray-200',
        {
          'bg-gray-600': isDark,
        }
      )}
    >
      <div className="relative w-24 h-10">
        <Image
          src="https://old.rs.school/images/rs_school.svg"
          alt="rs-logo"
          fill
        />
      </div>

      <strong className="space-x-2">
        <a href="https://github.com/SAK-RS">SAK74 ©</a>

        <span className="">2025</span>
      </strong>
    </footer>
  );
}
