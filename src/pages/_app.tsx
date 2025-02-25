import NextApp, { AppContext, AppInitialProps, AppProps } from 'next/app';
import 'index.css';
import ThemeProvider from 'components/ThemeProvider';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';
import Footer from 'components/Footer';

type AppOwnProps = {
  example: string;
};

export default function App({ Component, pageProps }: AppProps & AppOwnProps) {
  console.log({ pageProps });

  return (
    // <div>
    //   <h1>Hi here!</h1>
    //   <Component />
    // </div>

    <ThemeProvider>
      <Header />
      <RootLayout>
        <h1>Hi here!</h1>
        <Component {...pageProps} />
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
  console.log({ ctx });
  return { ...ctx, example: 'data' };
};
