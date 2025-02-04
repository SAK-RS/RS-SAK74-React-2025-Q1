import Header from 'components/Header';
import 'App.css';
import Home from 'pages/Home';
import Footer from 'components/Footer';
import React from 'react';

interface AppState {
  isHomeMounted: boolean;
}

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { isHomeMounted: true };
  }

  onUnmount = (): void => {
    this.setState((prev) => ({ isHomeMounted: !prev.isHomeMounted }));
  };
  render(): React.ReactNode {
    return (
      <>
        <Header />
        <div
          className="cursor-pointer"
          onClick={() => {
            this.onUnmount();
          }}
        >
          Unmount/Mount Home page
        </div>
        {this.state.isHomeMounted && <Home />}
        <Footer />
      </>
    );
  }
}

export default App;
