import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './ErrorBoundary';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback="">{children}</Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
