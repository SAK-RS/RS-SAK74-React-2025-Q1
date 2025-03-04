'use client';

import React, { ErrorInfo, PropsWithChildren } from 'react';

interface ComponentState {
  hasError: boolean;
  errorStack?: string | null;
}

class ErrorBoundary extends React.Component<PropsWithChildren, ComponentState> {
  state: ComponentState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.log({ error });
    console.log('Err info: ', errorInfo.componentStack);
    this.setState({ errorStack: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong...</h1>
          <p className="text-red-500">{this.state.errorStack}</p>
          <p className="mt-6 text-2xl italic text-primary">
            Try refresh the page
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
