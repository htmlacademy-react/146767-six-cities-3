import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {createAPI} from '@/services/api';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {
  AppThunkDispatch,
  makeMockFavorites,
  makeMockStore,
  makeMockUserData
} from '@/utils/mocks';
import {
  AppRoute,
  NameSpace,
  RequestStatus,
} from '@/constants';
import UserNav from './user-nav';

describe('OfferCard', () => {
  const axios = createAPI();
  const mockStore = makeMockStore();
  const mockUserData = makeMockUserData();
  const mockFavorites = makeMockFavorites();
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const renderWithProviders = (isAuth: boolean = true) => {
    const store = mockStoreCreator({
      ...mockStore,
      [NameSpace.User]: {
        id: 'id',
        userData: mockUserData,
        authorizationStatus: isAuth ? 'AUTH' : 'NO_AUTH',
        LoginStatus: RequestStatus.Succeeded,
      },
      [NameSpace.Favorites]: {
        favorites: [mockFavorites],
        favoritesStatus: RequestStatus.Succeeded,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserNav />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders user info when authenticated', () => {
    renderWithProviders();

    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toHaveAttribute('src', mockUserData.avatarUrl);
    expect(screen.getByText([mockFavorites].length.toString())).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should renders sign in link when not authenticated', () => {
    renderWithProviders(false);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText(mockUserData.email)).not.toBeInTheDocument();
  });

  it('navigates to favorites when authenticated', () => {
    renderWithProviders();

    expect(screen.getByRole('link'))
      .toHaveAttribute('href', AppRoute.Favorites);
  });

  it('navigates to login when not authenticated', () => {
    renderWithProviders(false);

    expect(screen.getByRole('link'))
      .toHaveAttribute('href', AppRoute.Login);
  });
});
