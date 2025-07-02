import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {router} from '@/services/router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createAPI} from '@/services/api';
import {fireEvent, render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppThunkDispatch, makeMockStore} from '@/utils/mocks';
import {ClassByTypeButton, NameSpace} from '@/constants';
import BookmarkButton from './bookmark-button';

describe('Component: Bookmark Button', () => {
  const mockId = 'mockId';
  const dataTestId = 'bookmark-button';
  const className = ClassByTypeButton.OfferCardButtonType;

  const axios = createAPI();
  const mockStore = makeMockStore();
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const renderWithProviders = (isAuth: boolean, isFavorite: boolean) => {
    const store = mockStoreCreator({
      ...mockStore,
      [NameSpace.User]: {
        authorizationStatus: isAuth ? 'AUTH' : 'NO_AUTH',
      },
      [NameSpace.Favorites]: {
        favorites: [
          {
            id: mockId,
            isFavorite,
          },
        ],
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookmarkButton
            id={mockId}
            buttonClassName={className}
          />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render correctly', () => {
    renderWithProviders(false, false);

    expect(screen.getByTestId(dataTestId));
  });

  it('should have active class if "isFavorite" = true and "isAuth" = true', () => {
    const expectedClass = `${ClassByTypeButton.OfferCardButtonType}__bookmark-button--active`;

    renderWithProviders(true, true);

    expect(screen.getByTestId(dataTestId)).toHaveClass(expectedClass);
  });

  it('should redirect to login if user is not auth and clicked', () => {
    const mockLocation = '/login';

    renderWithProviders(false, false);

    fireEvent.click(screen.getByTestId(dataTestId));
    expect(location.pathname).toBe(mockLocation);
  });
});
