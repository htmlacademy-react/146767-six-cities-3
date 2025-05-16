import {State} from '@/types/state';
import {NameSpace} from '@/constants';

export const getOffers = (state: State) => state[NameSpace.Load].offers;
export const getFullOffer = (state: State) => state[NameSpace.Load].fullOffer;
export const getComments = (state: State) => state[NameSpace.Load].comments;
export const getOffersNearby = (state: State) => state[NameSpace.Load].offersNearby;
export const getError = (state: State) => state[NameSpace.Load].error;
