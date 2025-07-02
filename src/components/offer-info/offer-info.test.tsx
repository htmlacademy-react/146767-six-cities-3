import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {makeMockOfferInfo} from '@/utils/mocks';
import {MAX_RATING} from '@/constants';
import OfferInfo from './offer-info';

vi.mock('../bookmark-button/bookmark-button', () => ({
  default: () => null
}));

describe('Component: OfferInfo', () => {
  const DataTestId = {
    offerInfo: 'offer-info',
    ratingStars: 'rating-stars',
    offerGoodsItem: 'offer-goods-item',
  };
  const mockProps = makeMockOfferInfo();

  it('should render all offer information correctly', () => {
    render(
      <OfferInfo
        {...mockProps}
      />);

    expect(screen.getByTestId(DataTestId.offerInfo)).toBeInTheDocument();
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.rating)).toBeInTheDocument();
    expect(screen.getByText(`€${mockProps.price}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${mockProps.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium mark when "isPremium" is false', () => {
    render(
      <OfferInfo
        {...mockProps}
        isPremium={false}
      />);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render correct rating stars width', () => {
    render(
      <OfferInfo
        {...mockProps}
      />);

    const ratingStars = screen.getByTestId(DataTestId.ratingStars);
    const expectedWidth = `${Math.round(mockProps.rating) * (100 / MAX_RATING)}%`;

    expect(ratingStars).toHaveStyle(`width: ${expectedWidth}`);
  });

  it('should capitalize offer type', () => {
    render(
      <OfferInfo
        {...mockProps}
        type="room"
      />);

    expect(screen.getByText('Room')).toBeInTheDocument();
  });

  it('should render all goods', () => {
    render(
      <OfferInfo
        {...mockProps}
      />);

    mockProps.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render correct price format', () => {
    const mockPrice = 999;

    render(
      <OfferInfo
        {...mockProps}
        price={mockPrice}
      />);

    expect(screen.getByText(`€${mockPrice}`)).toBeInTheDocument();
    expect(screen.getByText('night')).toBeInTheDocument();
  });

  it('should handle empty goods array', () => {
    render(
      <OfferInfo
        {...mockProps}
        goods={[]}
      />);

    expect(screen.queryByTestId(DataTestId.offerGoodsItem)).not.toBeInTheDocument();
  });
});
