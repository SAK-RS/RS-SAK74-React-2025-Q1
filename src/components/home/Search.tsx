import Button from 'components/Button';
import {
  useState,
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
} from 'react';

export const LOCAL_STORAGE_KEY = '__search';

interface SearchProps {
  value: string;
  onSubmit: (search: string) => void;
}

const Search: FC<SearchProps> = ({ onSubmit, value }) => {
  const [inputValue, setInputValue] = useState(() => value);

  const handleSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();
    window.localStorage.setItem(LOCAL_STORAGE_KEY, inputValue);
    onSubmit(inputValue);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className=""
          value={inputValue}
          onChange={handleChange}
        />
        <Button>Search</Button>
      </form>
    </div>
  );
};

export default Search;
