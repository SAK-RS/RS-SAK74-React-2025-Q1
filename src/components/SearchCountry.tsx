import { type FC, memo, useState } from 'react';

type CountrySearchProps = {
  onNameChange: (name: string) => void;
};

const CountrySearch: FC<CountrySearchProps> = ({ onNameChange }) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onNameChange(searchValue);
      }}
    >
      <label>
        Search country:
        <input
          type="text"
          value={searchValue}
          onChange={({ target: { value } }) => {
            setSearchValue(value);
          }}
        />
        <button className="cursor-pointer">Search</button>
      </label>
    </form>
  );
};

export default memo(CountrySearch);
