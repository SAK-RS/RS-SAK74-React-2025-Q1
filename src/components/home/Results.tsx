import React from 'react';

interface ResultsProps {
  search: string;
}

class Results extends React.Component<ResultsProps> {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <h3>Search: {this.props.search}</h3>
      </div>
    );
  }
}

export default Results;
