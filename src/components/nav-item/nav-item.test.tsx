import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '@/utils/mock-component';
import {makeMockStore} from '@/utils/mocks';
import {fireEvent, render, screen} from '@testing-library/react';
import {changeCity, changeSorting} from '@/store/user/user.slice';
import {AppRoute, DEFAULT_SORTING_TYPE} from '@/constants';
import NavItem from './nav-item';

describe('Component: NavItem', () => {
  const mockLocation = 'Location';
  const mockInitialState = makeMockStore();

  it('should render correctly with isActive to false', () => {
    const {withStoreComponent} = withStore(
      <NavItem
        location={mockLocation}
        isActive={false}
      />,
      mockInitialState,
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByText(mockLocation)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('locations__item-link tabs__item');
    expect(screen.getByRole('link')).not.toHaveClass('tabs__item--active');
  });

  it('should render correctly with isActive to true', () => {
    const {withStoreComponent} = withStore(
      <NavItem
        location={mockLocation}
        isActive
      />,
      mockInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toHaveClass('tabs__item--active');
  });

  it('should have correct link attribute', () => {
    const {withStoreComponent} = withStore(
      <NavItem
        location={mockLocation}
        isActive={false}
      />,
      mockInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Root);
  });

  it('should dispatch "changeCity" and "changeSorting" actions on click', () => {
    const {withStoreComponent, mockStore} = withStore(
      <NavItem
        location={mockLocation}
        isActive={false}
      />,
      mockInitialState
    );
    const actions = mockStore.getActions();

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(actions).toEqual([
      changeCity(mockLocation),
      changeSorting(DEFAULT_SORTING_TYPE)
    ]);
  });
});
