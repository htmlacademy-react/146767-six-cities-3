import {createAppAsyncThunk} from '@/hooks';
import {StatusCodes} from 'http-status-codes';
import {FullOfferItem} from '@/types/offers';
import {APIRoute, AppRoute} from '@/constants.js';
import axios from 'axios';

export const fetchFullOfferAction = createAppAsyncThunk<
  FullOfferItem,
  string
  >(
    'fullOffer/fetchFullOfferList',
    async (id, {extra: {api, router}}) => {
      try {
        const {data} = await api.get<FullOfferItem>(
          `${APIRoute.Offers}/${id}`
        );

        return data;
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response?.status === StatusCodes.NOT_FOUND
        ) {
          router.navigate(AppRoute.PageNotFound);
        }

        throw err;
      }
    }
  );
