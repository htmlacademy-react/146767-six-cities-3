import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '@/utils/mock-component';
import {makeMockStore} from '@/utils/mocks';
import {render, screen} from '@testing-library/react';
import {LOCATIONS} from '@/constants';
import * as NavItemComponent from '../nav-item/nav-item';
import NavList from './nav-list';

vi.mock('../nav-item/nav-item', () => ({
  default: () => null
}));

describe('Component: NavList', () => {
  const dataTestId = 'nav-list';
  const mockCity = LOCATIONS[0];
  const mockInitialState = makeMockStore();

  it('should render correctly', () => {
    const mockNavItem = vi.spyOn(NavItemComponent, 'default');
    const {withStoreComponent} = withStore(
      <NavList
        city={mockCity}
      />,
      mockInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    expect(mockNavItem).toHaveBeenCalledTimes(LOCATIONS.length);
    LOCATIONS.forEach((location) => {
      expect(mockNavItem).toHaveBeenCalledWith(
        expect.objectContaining({
          location,
          isActive: location === mockCity
        }),
        expect.anything()
      );
    });
  });
});
