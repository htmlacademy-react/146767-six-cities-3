import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { makeMockUser } from '@/utils/mocks';
import OfferHost from './offer-host';

describe('Component: OfferHost', () => {
  const mockHost = makeMockUser();
  const mockDescription = 'This is a test description of the offer.';
  const {name, avatarUrl} = mockHost;

  it('should render host information correctly', () => {
    render(
      <OfferHost
        host={mockHost}
        description={mockDescription}
      />);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByAltText('Host avatar')).toHaveAttribute('src', avatarUrl);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

  it('should have correct classes for pro host', () => {
    const {container} = render(
      <OfferHost
        host={mockHost}
        description={mockDescription}
      />);

    expect(container.querySelector('.offer__avatar-wrapper--pro')).toBeInTheDocument();
    expect(container.querySelector('.offer__user-status')).toBeInTheDocument();
  });

  it('should not render Pro status when host is not pro', () => {
    const regularHost = { ...mockHost, isPro: false };

    render(
      <OfferHost
        host={regularHost}
        description={mockDescription}
      />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });

  it('should render description correctly', () => {
    render(
      <OfferHost
        host={mockHost}
        description={mockDescription}
      />);

    const descriptionElement = screen.getByText(mockDescription);

    expect(descriptionElement).toHaveClass('offer__text');
    expect(descriptionElement.parentElement).toHaveClass('offer__description');
  });
});
