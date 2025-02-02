import Button from 'components/Button';
import Results from 'components/home/Results';
import Search from 'components/home/Search';
import React from 'react';

export const LOCAL_STORAGE_KEY = '__search';

interface HomeState {
  search: string;
  isError?: boolean;
}

class Home extends React.Component<Record<string, never>, HomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      search: window.localStorage.getItem(LOCAL_STORAGE_KEY) || '',
    };
  }

  onSubmit = (search: string): void => {
    this.setState({ search });
  };

  setError = () => {
    this.setState({ isError: true });
  };

  componentDidUpdate(): void {
    if (this.state.isError) {
      throw new Error('Error thrown from Home page');
    }
  }

  render() {
    return (
      <div className="container mx-auto flex flex-col">
        <Search value={this.state.search} onSubmit={this.onSubmit} />
        <Results search={this.state.search} />
        <Button className="self-end m-2" variant="warn" onClick={this.setError}>
          Throw error
        </Button>
      </div>
    );
  }
}

export default Home;
