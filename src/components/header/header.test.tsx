import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Header from './header';

const DataTestId = {
  logoId: 'logo',
  userNavId: 'user-nav',
};

const {logoId, userNavId} = DataTestId;

vi.mock('../logo/logo', () => ({
  default: () => <div data-testid={logoId} />
}));

vi.mock('../user-nav/user-nav', () => ({
  default: () => <div data-testid={userNavId} />
}));

describe('Component: Header', () => {
  it('should render correctly with default props', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toHaveClass('header');
    expect(screen.getByTestId(logoId)).toBeInTheDocument();
    expect(screen.getByTestId(userNavId)).toBeInTheDocument();
  });

  it('should not render "UserNav" when "hiddenUserNav" is "true"', () => {
    render(<Header hiddenUserNav />);

    expect(screen.getByTestId(logoId)).toBeInTheDocument();
    expect(screen.queryByTestId(userNavId)).not.toBeInTheDocument();
  });
});
