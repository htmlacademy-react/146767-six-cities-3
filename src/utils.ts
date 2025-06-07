import {createSelector} from '@reduxjs/toolkit';
import {RequestStatus, SortingType} from './constants';
import {OfferListItem} from './types/offers';
import {State} from '@/types/state';

export const getSortedOffers = (sort: string, offers: OfferListItem[]) => {
  switch (sort) {
    case SortingType.Popular:
      return offers;
    case SortingType.PriceUp:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortingType.PriceDown:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortingType.Rating:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      throw new Error(`Неизвестный тип сортировки: ${sort}`);
  }
};

export const createStatusSelector = (getStatusFunction: (state: State) => RequestStatus) => createSelector(
  [getStatusFunction],
  (status) => ({
    isLoading: status === RequestStatus.Loading || status === RequestStatus.Idle,
    isFailed: status === RequestStatus.Failed,
  })
);
