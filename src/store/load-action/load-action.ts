import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchCommentsAction,
  fetchFullOfferAction,
  fetchOfferListAction,
  fetchOffersNearbyAction
} from '../api-actions';
import {FullOfferItem, OfferListItem, Comment} from '@/types/offers';
import {router} from '@/services/router';
import {AxiosError} from 'axios';
import {AppRoute, NameSpace} from '@/constants';

interface InitialStateProps {
  offers: OfferListItem[] | null;
  fullOffer: FullOfferItem | null;
  comments: Comment[] | null;
  offersNearby: OfferListItem[] | null;
  error?: string;
}

const initialState: InitialStateProps = {
  offers: null,
  fullOffer: null,
  comments: null,
  offersNearby: null,
  error: undefined
};

export const dataLoadAction = createSlice({
  name: NameSpace.Load,
  initialState,
  reducers: {
    resetFullOffer: (state) => {
      state.fullOffer = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferListAction.fulfilled, (state, action: PayloadAction<OfferListItem[]>) => {
        state.offers = action.payload;
      })
      .addCase(fetchOfferListAction.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action: PayloadAction<FullOfferItem>) => {
        state.fullOffer = action.payload;
      })
      .addCase(fetchFullOfferAction.rejected, (state, action) => {
        state.error = action.error.message;

        if (action.error.code === AxiosError.ERR_BAD_REQUEST) {
          router.navigate(AppRoute.PageNotFound);
        }
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const {resetFullOffer} = dataLoadAction.actions;
