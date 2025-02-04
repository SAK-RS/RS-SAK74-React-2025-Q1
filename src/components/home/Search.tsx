import Button from 'components/Button';
import React, { FormEventHandler } from 'react';

export const LOCAL_STORAGE_KEY = '__search';

interface SearchProps {
  value: string;
  onSubmit: (search: string) => void;
}

class Search extends React.PureComponent<SearchProps, { inputValue: string }> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: props.value,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();
    window.localStorage.setItem(LOCAL_STORAGE_KEY, this.state.inputValue);
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Search"
            className=""
            value={this.state.inputValue}
            onChange={this.onChange}
          />
          <Button>Search</Button>
        </form>
      </div>
    );
  }
}

export default Search;
