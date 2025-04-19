import {createReducer} from '@reduxjs/toolkit';
import {cityСhange, searchOffers} from '@/store/action';
import {offers} from '@/mocks/offers';
import {DEFAULT_CITY} from '@/constants';

const getFilterOffers = (city: string) => offers.filter(
  (offer) => offer.city.name === city
);

const initialPoint = {
  city: DEFAULT_CITY,
  offers: getFilterOffers(DEFAULT_CITY)
};

export const reducer = createReducer(initialPoint, (builder) => {
  builder
    .addCase(cityСhange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(searchOffers, (state) => {
      state.offers = getFilterOffers(state.city);
    });
});
