import {createAppAsyncThunk} from '@/hooks';
import {OfferListItem} from '@/types/offers';
import {APIRoute, RequestMessageError} from '@/constants.js';
import {toast} from 'react-toastify';
import axios from 'axios';

export const fetchOffersNearbyAction = createAppAsyncThunk<
  OfferListItem[],
  string
  >(
    'offersNearby/fetchOffersNearbyList',
    async (id, {extra: {api}}) => {
      try {
        const {data} = await api.get<OfferListItem[]>(
          `${APIRoute.Offers}/${id}/${APIRoute.Nearby}`
        );

        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.warn(`${RequestMessageError.OffersNearbyLoadingFailed} ${err.message}`);
        }

        throw err;
      }
    }
  );
