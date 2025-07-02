import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {withStore} from '@/utils/mock-component';
import {makeMockStore} from '@/utils/mocks';
import {fireEvent, render, screen} from '@testing-library/react';
import {AppRoute} from '@/constants';
import Logo from './logo';

describe('Component: Logo', () => {
  const dataTestId = 'logo';
  const headerType = 'header';
  const footerType = 'footer';
  const mockInitialState = makeMockStore();

  it('should render correctly with header type', () => {
    const {withStoreComponent} = withStore(
      <Logo type={headerType} />,
      mockInitialState
    );
    const expectedClass = `${headerType}__logo-link`;

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestId)).toHaveClass(expectedClass);
  });

  it('should render correctly with footer type', () => {
    const {withStoreComponent} = withStore(
      <Logo type={footerType} />,
      mockInitialState
    );
    const expectedClass = `${footerType}__logo-link`;

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestId)).toHaveClass(expectedClass);
  });

  it('should redirect to Main Page if user clicked to logo', () => {
    const {withStoreComponent} = withStore(
      <Logo type={headerType} />,
      mockInitialState
    );
    const mockLocation = AppRoute.Root;

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId(dataTestId));
    expect(location.pathname).toBe(mockLocation);
  });
});
