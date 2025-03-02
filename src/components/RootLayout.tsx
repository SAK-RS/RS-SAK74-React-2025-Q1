import { useTheme } from 'components/ThemeProvider';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { cn } from 'utils/cn';
import Button from './Button';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useTheme();
  const [isError, setIsError] = useState(false);

  const setError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (isError) {
      throw new Error('Error thrown from Home page');
    }
  }, [isError]);

  return (
    <main
      className={cn(
        'container mx-auto px-2 pb-3 pt-20 bg-blue-200 min-h-[calc(100vh-45px)] dark:bg-gray-800 dark:text-blue-50',
        {
          dark: isDark,
        }
      )}
    >
      {children}
      <Button
        className="fixed right-2 bottom-2 bg-gray-100"
        variant="warn"
        onClick={setError}
      >
        Throw error
      </Button>
    </main>
  );
};

export default RootLayout;
