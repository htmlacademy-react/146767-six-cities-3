import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {
  Route,
  Routes,
  MemoryRouter,
  NavigateProps,
  useLocation,
} from 'react-router-dom';
import {useAppSelector} from '@/hooks';
import {AppRoute} from '@/constants';
import PrivateRoute from './private-route';

vi.mock('@/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', async (): Promise<{
  useLocation: () => Location;
  Navigate: (props: NavigateProps) => React.ReactElement;
}> => {
  const original = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...original,
    useLocation: vi.fn().mockReturnValue({
      pathname: '/test',
      state: null,
      key: 'default',
      search: '',
      hash: '',
    }),
    Navigate: ({ to, ...props }: NavigateProps) => {
      const toStr = typeof to === 'string' ? to : JSON.stringify(to);

      return (
        <div
          data-testid="navigate"
          data-to={toStr}
          data-props={JSON.stringify(props)}
        />
      );
    },
  };
});

describe('Component: PrivateRoute', () => {
  const TestComponent = () => <div>Test Content</div>;
  const LoginPage = () => <div>Login Page</div>;
  const mockLocation = {
    pathname: '/protected',
    state: null,
    key: '',
    search: '',
    hash: '',
  };

  beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue(mockLocation);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when auth and not onlyUnAuth', () => {
    vi.mocked(useAppSelector).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute redirectPath={AppRoute.Login}>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('should redirect when not auth and not onlyUnAuth', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute redirectPath={AppRoute.Login}>
                <TestComponent />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', AppRoute.Login);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('should preserve location state when redirecting', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);
    const testState = { some: 'state' };
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      state: testState,
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute redirectPath={AppRoute.Login}>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toHaveAttribute('data-to', AppRoute.Login);
  });

  it('should render children when not auth and onlyUnAuth', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PrivateRoute redirectPath={AppRoute.Root} onlyUnAuth>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });
});
