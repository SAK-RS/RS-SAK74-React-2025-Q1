import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import RootLayout from 'components/RootLayout';
import StoreProvider from 'components/StoreProvider';
import ThemeProvider from 'components/ThemeProvider';
import 'index.css';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <Header />
            <StoreProvider>
              <RootLayout>
                <Suspense>{children}</Suspense>
              </RootLayout>
            </StoreProvider>
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
