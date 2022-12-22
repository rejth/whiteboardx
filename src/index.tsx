import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const rootElement = document.getElementById('root') as HTMLDivElement;

if (!rootElement) {
  throw new Error(
    'Root container was not found. Failed to mount React app. Please make sure the container exists and is in the DOM.',
  );
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
