import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { FontSizeProvider } from './contexts/FontSizeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FontSizeProvider>
      <RouterProvider router={router} />
    </FontSizeProvider>
  </React.StrictMode>
);
