import React from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import {store} from './store';
import App from '@/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
