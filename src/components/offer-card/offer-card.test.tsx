import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import * as userSlice from '@/store/user/user.slice';
import {Provider} from 'react-redux';
import {router} from '@/services/router';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppThunkDispatch, makeMockOffers, makeMockStore} from '@/utils/mocks';
import {AppRoute, ClassByTypeCard} from '@/constants';
import OfferCard from './offer-card';

describe('OfferCard', () => {
  const dataTestId = 'bookmark-button';
  const axios = createAPI();
  const mockOffer = makeMockOffers();
  const mockStore = makeMockStore();
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const renderWithProviders = (
    isPremium: boolean = true,
    rating: number = 5,
  ) => {
    const store = mockStoreCreator({
      ...mockStore,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard
            {...mockOffer}
            rating={rating}
            isPremium={isPremium}
            cardClassName={ClassByTypeCard.MainPageCardType}
          />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render correctly with given props', () => {
    renderWithProviders();

    const mockTyoe = mockOffer.type.charAt(0).toUpperCase() + mockOffer.type.slice(1);
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText(mockTyoe)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('dispatches `setOfferId` on mouse enter/leave (for MainPageCardType)', async () => {
    const mockSetOfferId = vi.spyOn(userSlice, 'setOfferId');

    renderWithProviders();

    const card = screen.getByRole('article');
    await userEvent.hover(card);
    expect(mockSetOfferId).toHaveBeenCalledWith(mockOffer.id);
    expect(mockSetOfferId).toHaveBeenCalledTimes(1);


    await userEvent.unhover(card);
    expect(mockSetOfferId).toHaveBeenCalledWith();
    expect(mockSetOfferId).toHaveBeenCalledTimes(2);

  });

  it('renders correct image size based on card type "MainPageCardType"', () => {
    renderWithProviders();

    const img = screen.getByAltText('Place image');
    expect(img).toHaveAttribute('width', '260');
    expect(img).toHaveAttribute('height', '200');
  });

  it('has correct link to offer page', () => {
    renderWithProviders();

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', `${AppRoute.Offer}/${mockOffer.id}`);
    });
  });

  it('does not show "Premium" badge if `isPremium` is false', () => {
    renderWithProviders(false);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('renders correct rating stars', () => {
    renderWithProviders(undefined, 4);

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toHaveStyle('width: 80%');
  });
});
