import {
  createContext,
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

export type ThemeContextType = {
  isDark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const matchDark = matchMedia('(prefers-color-scheme: dark)');

  const [isDark, setDark] = useState(() => matchDark.matches);
  function listener(this: MediaQueryList) {
    setDark(this.matches);
  }
  useEffect(() => {
    matchDark.addEventListener('change', listener);
    return () => {
      matchDark.removeEventListener('change', listener);
    };
  }, []);
  return <ThemeContext value={{ isDark, setDark }}>{children}</ThemeContext>;
};

export default ThemeProvider;

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw Error('Component is beyong context...!');
  }
  return context;
};
