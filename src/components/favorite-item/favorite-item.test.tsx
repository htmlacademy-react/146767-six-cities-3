import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '@/utils/mock-component';
import {render, screen, fireEvent} from '@testing-library/react';
import {changeCity, changeSorting} from '@/store/user/user.slice';
import {makeMockOffers, makeMockStore} from '@/utils/mocks';
import {DEFAULT_SORTING_TYPE} from '@/constants';
import FavoriteItem from './favorite-item';

describe('Component: FavoriteItem', () => {
  const mockCity = 'City';
  const dataTestId = 'favorite-item';
  const mockInitialState = makeMockStore();
  const mockOffers = [makeMockOffers()];

  it('should render correctly with offers', () => {
    const {withStoreComponent} = withStore(
      <FavoriteItem
        offers={mockOffers}
        location={mockCity}
      />,
      mockInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    expect(screen.getByText(mockCity)).toBeInTheDocument();
    expect(screen.queryAllByRole('link')[0]).toHaveClass('locations__item-link');
  });

  it('should not render when no offers for location', () => {
    const {withStoreComponent} = withStore(
      <FavoriteItem
        offers={[]}
        location={mockCity}
      />,
      mockInitialState
    );

    const {container} = render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should dispatch actions when link clicked', () => {
    const {withStoreComponent, mockStore} = withStore(
      <FavoriteItem
        offers={mockOffers}
        location={mockCity}
      />,
      mockInitialState
    );
    const actions = mockStore.getActions();

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    fireEvent.click(screen.queryAllByRole('link')[0]);
    expect(actions).toEqual([
      changeCity(mockCity),
      changeSorting(DEFAULT_SORTING_TYPE)
    ]);
  });
});
