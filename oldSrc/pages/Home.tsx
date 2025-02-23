import Button from 'components/Button';
import Results from 'components/home/Results';
import Search from 'components/home/Search';
import { useEffect, useState } from 'react';

export const LOCAL_STORAGE_KEY = '__search';

const Home = () => {
  const [search, setSearch] = useState(
    () => window.localStorage.getItem(LOCAL_STORAGE_KEY) || ''
  );
  const [isError, setIsError] = useState(false);

  const onSubmit = (search: string): void => {
    setSearch(search);
  };

  const setError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (isError) {
      throw new Error('Error thrown from Home page');
    }
  }, [isError]);

  return (
    <div className="flex flex-col">
      <Search value={search} onSubmit={onSubmit} />
      <Results search={search} />
      <Button
        className="fixed right-2 bottom-2 bg-gray-100"
        variant="warn"
        onClick={setError}
      >
        Throw error
      </Button>
    </div>
  );
};

export default Home;
