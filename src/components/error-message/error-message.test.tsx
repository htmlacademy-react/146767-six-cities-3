import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {withStore} from '@/utils/mock-component';
import {NameSpace, RequestStatus} from '@/constants';
import {State} from '@/types/state';
import ErrorMessage from './error-message';

type PartialState = Pick<State, NameSpace.Offers | NameSpace.FullOffer>;

vi.mock('react-helmet-async', () => ({
  Helmet: () => null,
}));

describe('Component: Error Message', () => {
  const dataTestId = 'error-message';

  let mockInitialState: PartialState;

  beforeEach(() => {
    mockInitialState = {
      [NameSpace.Offers]: {
        offers: [],
        errorMessage: null,
        offersStatus: RequestStatus.Idle,
      },
      [NameSpace.FullOffer]: {
        fullOffer: null,
        errorMessage: null,
        fullOfferStatus: RequestStatus.Idle,
      }
    };
  });

  it('should render correctly', () => {
    const updatedState = {
      ...mockInitialState,
      [NameSpace.Offers]: {
        ...mockInitialState[NameSpace.Offers],
        errorMessage: 'Offer error message',
      },
      [NameSpace.FullOffer]: {
        ...mockInitialState[NameSpace.FullOffer],
        errorMessage: 'FullOffer error message',
      }
    };
    const {withStoreComponent} = withStore(<ErrorMessage />, updatedState);

    render(withStoreComponent);

    expect(screen.getByTestId(dataTestId));
    expect(screen.getByText(/Offer error message/i)).toBeInTheDocument();
    expect(screen.getByText(/FullOffer error message/i)).toBeInTheDocument();
  });
});
