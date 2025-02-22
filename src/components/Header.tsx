import { useTheme } from './ThemeProvider';

export default function Header() {
  const { isDark, setDark } = useTheme();
  const handleClick = () => {
    setDark((prev) => !prev);
  };
  return (
    <header className="bg-primary text-white py-2 flex justify-between px-6 items-center">
      <h1>RS-App</h1>
      <button
        className="text-2xl cursor-pointer"
        onClick={handleClick}
        title="toggle theme"
      >
        {isDark ? '☀' : '🌙'}
      </button>
    </header>
  );
}
