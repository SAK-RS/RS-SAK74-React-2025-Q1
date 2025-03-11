import Footer from 'components/Footer';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';
import ThemeProvider from 'components/ThemeProvider';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from 'routes';
import { BASE_URL } from '../base';

const router = createBrowserRouter(routes, { basename: BASE_URL });

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <RootLayout>
          <RouterProvider router={router} />
        </RootLayout>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
