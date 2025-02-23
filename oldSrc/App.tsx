import Header from 'components/Header';
import 'App.css';
import Footer from 'components/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from 'routes';
import { BASE_URL } from '../base';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'store';
import ThemeProvider from 'components/ThemeProvider';
import RootLayout from 'pages/RootLayout';

const router = createBrowserRouter(routes, {
  basename: BASE_URL,
});

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <RootLayout>
          <ReduxProvider store={store}>
            <RouterProvider router={router} />
          </ReduxProvider>
        </RootLayout>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
