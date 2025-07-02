import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: Favorites Empty', () => {
  it('should render correctly', () => {
    const expectedText = /Nothing yet/i;

    render(<FavoritesEmpty />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
