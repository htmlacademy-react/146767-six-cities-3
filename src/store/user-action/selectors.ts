import {State} from '@/types/state';
import {NameSpace} from '@/constants';

export const getOfferId = (state: State) => state[NameSpace.User].id;
export const getCurrentCity = (state: State) => state[NameSpace.User].city;
export const getCurrentSorting = (state: State) => state[NameSpace.User].sorting;
