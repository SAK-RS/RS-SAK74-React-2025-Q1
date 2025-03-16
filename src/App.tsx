import Footer from 'components/Footer';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';
import ThemeProvider from 'components/ThemeProvider';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from 'routes';
import { BASE_URL } from '../base';
import { Provider } from 'react-redux';
import { store } from 'store';

const router = createBrowserRouter(routes, { basename: BASE_URL });

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <RootLayout>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </RootLayout>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
