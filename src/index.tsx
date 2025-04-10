import {offers} from '@/mocks/offers';
import {fullOffer} from '@/mocks/full-offer';
import {favorites} from '@/mocks/favorites';
import {comments} from '@/mocks/comments';
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
      fullOffer={fullOffer}
      favorites={favorites}
      comments={comments}
    />
  </React.StrictMode>
);
