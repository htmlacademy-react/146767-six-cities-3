import {State} from '@/types/state';
import {NameSpace} from '@/constants';

export const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;
export const getUpdatedFavorite = (state: State) => state[NameSpace.Favorites].updatedFavorite;
export const geFavoritesStatus = (state: State) => state[NameSpace.Favorites].FavoritesStatus;
