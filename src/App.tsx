import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <RootLayout>
        <h1 className="text-primary">Hello from new App</h1>
      </RootLayout>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
