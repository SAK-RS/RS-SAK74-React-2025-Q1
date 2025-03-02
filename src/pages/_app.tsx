import { AppProps } from 'next/app';
import 'index.css';
import ThemeProvider from 'components/ThemeProvider';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';
import Footer from 'components/Footer';
import { wrapper } from 'store';
import { Provider } from 'react-redux';
import ErrorBoundary from 'components/ErrorBoundary';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Header />
        <RootLayout>
          <Provider store={store}>
            <Component {...props.pageProps} />
          </Provider>
        </RootLayout>
        <Footer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
