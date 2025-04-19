import {createAction} from '@reduxjs/toolkit';

export const cityСhange = createAction('city change', (value: string) => ({
  payload: value
}));
export const searchOffers = createAction('search for offers');
