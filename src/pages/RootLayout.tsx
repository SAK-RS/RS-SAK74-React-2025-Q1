import { useTheme } from 'components/ThemeProvider';
import type { FC, PropsWithChildren } from 'react';
import { cn } from 'utils/cn';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <main
      className={cn(
        'container mx-auto px-2 py-3 bg-blue-200 min-h-[calc(100vh-114px)] dark:bg-gray-800 dark:text-blue-50',
        {
          dark: isDark,
        }
      )}
    >
      {children}
    </main>
  );
};

export default RootLayout;
