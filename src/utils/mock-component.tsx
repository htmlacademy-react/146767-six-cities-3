import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {createAPI} from '@/services/api';
import {MockStore, configureMockStore} from '@jedmao/redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppThunkDispatch} from './mocks';

interface ComponentWithMockStore {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withHistory(
  component: JSX.Element,
  initialEntries: string[] = []
): JSX.Element {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </MemoryRouter>
  );
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
