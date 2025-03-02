import Button from 'components/Button';
import { useRouter } from 'next/router';
import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
} from 'react';

export const LOCAL_STORAGE_KEY = '__search';

const Search: FC = () => {
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setInputValue(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '');
  }, []);

  const { push } = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    window.localStorage.setItem(LOCAL_STORAGE_KEY, inputValue);
    push({
      query: { search: inputValue, page: 1 },
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="dark:bg-gray-600 rounded-lg"
          value={inputValue}
          onChange={handleChange}
          name="search"
        />
        <Button>Search</Button>
      </form>
    </div>
  );
};

export default Search;
