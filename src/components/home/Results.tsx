import { getCharacters } from 'api/getCharacters';
import React from 'react';
import { Character } from 'types';
import CharacterCard from './CharacterCard';
import Spinner from 'components/Spinner';

interface ResultsProps {
  search: string;
}

interface ResultsState {
  characters: Character[];
  isLoading: boolean;
  error?: string;
}

class Results extends React.Component<ResultsProps, ResultsState> {
  state: Readonly<ResultsState> = {
    characters: [],
    isLoading: false,
  };

  fetchCharacters = async (search: string) => {
    this.setState({ isLoading: true, error: undefined, characters: [] });
    try {
      const characters = await getCharacters(search);
      this.setState({ characters });
    } catch (err) {
      if (typeof err === 'string') {
        this.setState({ error: err });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps: Readonly<ResultsProps>): void {
    if (prevProps.search !== this.props.search) {
      this.fetchCharacters(this.props.search);
    }
  }

  componentDidMount(): void {
    this.fetchCharacters(this.props.search);
  }

  render() {
    return (
      <div className="my-6">
        {this.state.characters && (
          <div className="flex flex-wrap gap-4 justify-around">
            {this.state.characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        <Spinner loading={this.state.isLoading} size="large" />
        {this.state.error && (
          <div className="text-red-500 text-2xl">{this.state.error}... 😥 </div>
        )}
      </div>
    );
  }
}

export default Results;
