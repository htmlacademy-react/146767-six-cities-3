import {combineReducers} from '@reduxjs/toolkit';
import {offersLoadAction} from './offers/offers.slice';
import {fullOffersLoadAction} from './full-offer/full-offer.slice';
import {commentsLoadAction} from './comments/comments.slice';
import {offersNearbyLoadAction} from './offers-nearby/offers-nearby.slice';
import {favoritesLoadAction} from './favorites/favorites.slice';
import {userAction} from './user/user.slice';
import {NameSpace} from '@/constants';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersLoadAction.reducer,
  [NameSpace.FullOffer]: fullOffersLoadAction.reducer,
  [NameSpace.Comments]: commentsLoadAction.reducer,
  [NameSpace.OffersNearby]: offersNearbyLoadAction.reducer,
  [NameSpace.Favorites]: favoritesLoadAction.reducer,
  [NameSpace.User]: userAction.reducer,
});
