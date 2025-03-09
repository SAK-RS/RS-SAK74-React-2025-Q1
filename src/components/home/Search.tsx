'use client';

import Button from 'components/Button';
import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
} from 'react';

export const LOCAL_STORAGE_KEY = '__search';

const Search: FC<{ search?: string }> = ({ search }) => {
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setInputValue(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '');
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    if (inputValue === search) {
      ev.preventDefault();
      return;
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, inputValue);
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
        <input type="hidden" name="page" value={1} />
        <Button>Search</Button>
      </form>
    </div>
  );
};

export default Search;
