import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import {offers} from '@/mocks/offers';
import {fullOffer} from '@/mocks/full-offer';
import {favorites} from '@/mocks/favorites';
import {comments} from '@/mocks/comments';
import App from '@/components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={offers}
        fullOffer={fullOffer}
        favorites={favorites}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>
);
