import {createAppAsyncThunk} from '@/hooks';
import {OfferListItem} from '@/types/offers';
import {FavoriteData} from '@/types/favorite-data';
import {APIRoute, RequestMessageError} from '@/constants.js';
import {toast} from 'react-toastify';
import axios from 'axios';

export const fetchFavoritesAction = createAppAsyncThunk<
  OfferListItem[],
  void
  >(
    'favorites/fetchFavoritesList',
    async (_arg, {extra: {api}}) => {
      try {
        const {data} = await api.get<OfferListItem[]>(APIRoute.Favorites);

        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(
            `${RequestMessageError.FavoritesLoadingFailed} ${err.message}`
          );
        }

        throw err;
      }
    }
  );

export const postFavoriteAction = createAppAsyncThunk<
  OfferListItem,
  FavoriteData
    >(
      'favorites/postFavorite',
      async ({id, status}, {extra: {api}}) => {
        try {
          const {data} = await api.post<OfferListItem>(
            `${APIRoute.Favorites}/${id}/${status}`
          );

          return data;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            toast.error(
              `${RequestMessageError.FavoritesPostingFailed} ${err.message}`
            );
          }

          throw err;
        }
      }
    );
