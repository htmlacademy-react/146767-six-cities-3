import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@/types/state.js';
import {
  OfferListItem,
  FullOfferItem,
  Comment
} from '@/types/offers';
import {APIRoute} from '@/constants.js';

export const fetchOfferListAction = createAsyncThunk<
  OfferListItem[],
  undefined,
  AsyncThunkConfig
  >(
    'data/fetchOfferList',
    async (_arg, {extra: {api}}) =>
      (await api.get<OfferListItem[]>(APIRoute.Offers))
        .data
  );

export const fetchFullOfferAction = createAsyncThunk<
  FullOfferItem,
  string,
  AsyncThunkConfig
  >(
    'data/fetchFullOfferList',
    async (id, {extra: {api}}) =>
      (await api.get<FullOfferItem>(`${APIRoute.Offers}${id}`))
        .data
  );

export const fetchOffersNearbyAction = createAsyncThunk<
  OfferListItem[],
  string,
  AsyncThunkConfig
  >(
    'data/fetchOffersNearbyList',
    async (id, {extra: {api}}) =>
      (await api.get<OfferListItem[]>(`${APIRoute.Offers}${id}${APIRoute.Nearby}`))
        .data
  );

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  string,
  AsyncThunkConfig
  >(
    'data/fetchCommentsList',
    async (id, {extra: {api}}) =>
      (await api.get<Comment[]>(`${APIRoute.Comments}${id}`))
        .data
  );
