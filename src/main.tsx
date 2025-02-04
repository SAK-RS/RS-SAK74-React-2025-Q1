import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from 'components/ErrorBoundary.tsx';

const rootContainer = document.getElementById('root');
if (rootContainer) {
  createRoot(rootContainer).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
