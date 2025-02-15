import Header from 'components/Header';
import 'App.css';
import Footer from 'components/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from 'routes';
import { BASE_URL } from '../base';
import { Provider } from 'react-redux';
import { store } from 'store';

const router = createBrowserRouter(routes, {
  basename: BASE_URL,
});

const App = () => {
  return (
    <>
      <Header />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Footer />
    </>
  );
};

export default App;
