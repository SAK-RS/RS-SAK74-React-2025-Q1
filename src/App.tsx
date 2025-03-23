import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Home from 'components/Home';
import RootLayout from 'components/RootLayout';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <RootLayout>
        <Home />
      </RootLayout>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
