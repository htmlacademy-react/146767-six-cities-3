import {createSlice} from '@reduxjs/toolkit';
import {fetchFavoritesAction, postFavoriteAction} from './favorites.api';
import {OfferListItem} from '@/types/offers';
import {NameSpace, RequestStatus} from '@/constants';

interface InitialStateProps {
  favorites: OfferListItem[];
  updatedFavorite: OfferListItem | null;
  FavoritesStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  favorites: [],
  updatedFavorite: null,
  FavoritesStatus: RequestStatus.Idle,
};

export const favoritesLoadAction = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.FavoritesStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.FavoritesStatus = RequestStatus.Succeeded;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.FavoritesStatus = RequestStatus.Failed;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites = [
            ...state.favorites,
            action.payload
          ];
          state.updatedFavorite = action.payload;
        } else {
          state.favorites = (
            state.favorites
              .filter((favorite) => favorite.id !== action.payload.id)
          );
          state.updatedFavorite = action.payload;
        }
      });
  }
});
