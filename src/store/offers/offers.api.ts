import {createAppAsyncThunk} from '@/hooks';
import {OfferListItem} from '@/types/offers';
import {APIRoute} from '@/constants.js';

export const fetchOfferListAction = createAppAsyncThunk<
  OfferListItem[],
  void
  >(
    'offers/fetchOfferList',
    async (_arg, {extra: {api}}) => {
      const {data} = await api.get<OfferListItem[]>(APIRoute.Offers);

      return data;
    }
  );
