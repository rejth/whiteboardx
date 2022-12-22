import React from 'react';

import { AppProvider } from './providers';
import { AppRouter } from './router';
import './styles/index.scss';

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
