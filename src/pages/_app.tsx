import NextApp, { AppContext, AppInitialProps, AppProps } from 'next/app';
import 'index.css';
import ThemeProvider from 'components/ThemeProvider';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';
import Footer from 'components/Footer';
import { wrapper } from 'store';
import { Provider } from 'react-redux';

type AppOwnProps = {
  example: string;
};

function App({ Component, ...rest }: AppProps & AppOwnProps) {
  // console.log('App props: ', rest);

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    // <div>
    //   <h1>Hi here!</h1>
    //   <Component />
    // </div>

    <ThemeProvider>
      <Header />
      <RootLayout>
        <h1>Hi here!</h1>
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
        {/* <Component {...props.pageProps} /> */}
      </RootLayout>
      <Footer />
    </ThemeProvider>
  );
}

App.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  // console.log('Context in App: ', context);

  const ctx = await NextApp.getInitialProps(context);
  // console.log({ ctx });
  console.log('Run initial props');
  // context.ctx.pathname
  return { ...ctx, example: 'data' };
};

export default wrapper.withRedux(App);
