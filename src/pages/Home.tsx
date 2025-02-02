import Results from 'components/home/Results';
import Search from 'components/home/Search';
import React from 'react';

export const LOCAL_STORAGE_KEY = '__search';

interface HomeState {
  search: string;
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

  render() {
    return (
      <div>
        <Search value={this.state.search} onSubmit={this.onSubmit} />
        <Results search={this.state.search} />
      </div>
    );
  }
}

export default Home;
