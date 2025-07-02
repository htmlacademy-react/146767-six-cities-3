import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {router} from '@/services/router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppThunkDispatch, makeMockStore} from '@/utils/mocks';
import {SortingType } from '@/constants';
import {act, render, screen } from '@testing-library/react';
import {createAPI} from '@/services/api';
import PlacesSorting from './places-sorting';

describe('Component: PlacesSorting', () => {
  const dataTestId = 'sorting';
  const mockCurrentSorting = SortingType.Popular;

  const axios = createAPI();
  const mockStore = makeMockStore();
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const renderWithProviders = () => {
    const store = mockStoreCreator({
      ...mockStore,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlacesSorting />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should renders correctly with current sorting', () => {
    renderWithProviders();

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveClass('places__options places__options--custom');
  });

  it('toggles sorting options when clicking on sorting type', async () => {
    renderWithProviders();
    const sortingType = screen.getByTestId(dataTestId);

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    await act(async () => {
      await userEvent.click(sortingType);
    });

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await act(async () => {
      await userEvent.click(sortingType);
    });

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('renders all sorting options', () => {
    const typeCount = Object.keys(SortingType).length;

    renderWithProviders();

    expect(screen.getAllByRole('listitem')).toHaveLength(typeCount);
  });

  it('marks current sorting as active', () => {
    renderWithProviders();

    const activeOption = screen.getAllByText(mockCurrentSorting)[1].closest('li');
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('closes options after selecting one', async () => {
    renderWithProviders();

    const newSortingType = SortingType.PriceDown;

    await act(async () => {
      await userEvent.click(
        screen.getAllByText(mockCurrentSorting)[1]
      );
    });
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await act(async () => {
      await userEvent.click(
        screen.getByText(newSortingType)
      );
    });
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });
});
