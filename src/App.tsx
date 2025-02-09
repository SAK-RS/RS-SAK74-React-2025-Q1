import Header from 'components/Header';
import 'App.css';
import Footer from 'components/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from 'routes';
import { BASE_URL } from '../base';

const router = createBrowserRouter(routes, {
  basename: BASE_URL,
});

const App = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
