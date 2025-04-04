import {offers} from '@/mocks/offers';
import {favorites} from '@/mocks/favorites';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      favorites={favorites}
    />
  </React.StrictMode>
);
