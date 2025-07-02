import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {makeMockOffers} from '@/utils/mocks';
import {ClassByTypeCard} from '@/constants';
import * as OfferCardComponent from '../offer-card/offer-card';
import OffersList from './offers-list';

vi.mock('../offer-card/offer-card', () => ({
  default: () => null
}));

describe('Component: OffersList', () => {
  const mockOffers = [makeMockOffers()];

  it('should render correct class for "MainPageCardType" card type', () => {
    const {container} = render(
      <OffersList
        offers={mockOffers}
        cardClassName={ClassByTypeCard.MainPageCardType}
      />
    );

    expect(container.firstChild).toHaveClass('cities__places-list places__list tabs__content');
  });

  it('should render correct class for "FavoritesPageCardType" card type', () => {
    const {container} = render(
      <OffersList
        offers={mockOffers}
        cardClassName={ClassByTypeCard.FavoritesPageCardType}
      />
    );

    expect(container.firstChild).toHaveClass('favorites__places');
  });

  it('should render correct class for "OfferPageCardType" card type', () => {
    const { container } = render(
      <OffersList
        offers={mockOffers}
        cardClassName={ClassByTypeCard.OfferPageCardType}
      />
    );

    expect(container.firstChild).toHaveClass('near-places__list places__list');
  });

  it('should render all offers', () => {
    const mockOfferCard = vi.spyOn(OfferCardComponent, 'default');

    render(
      <OffersList
        offers={mockOffers}
        cardClassName={ClassByTypeCard.MainPageCardType}
      />
    );

    expect(mockOfferCard).toHaveBeenCalledTimes(mockOffers.length);
    mockOffers.forEach((offer) => {
      expect(mockOfferCard).toHaveBeenCalledWith(
        expect.objectContaining({
          id: offer.id,
          title: offer.title,
          cardClassName: ClassByTypeCard.MainPageCardType
        }),
        expect.anything()
      );
    });
  });

  it('should not render when offers are undefined', () => {
    const mockOfferCard = vi.spyOn(OfferCardComponent, 'default');

    render(
      <OffersList
        offers={undefined}
        cardClassName={ClassByTypeCard.MainPageCardType}
      />
    );

    expect(mockOfferCard).toHaveBeenCalledTimes(0);
  });

  it('should not render when offers array is empty', () => {
    const mockOfferCard = vi.spyOn(OfferCardComponent, 'default');

    render(
      <OffersList
        offers={[]}
        cardClassName={ClassByTypeCard.MainPageCardType}
      />
    );

    expect(mockOfferCard).toHaveBeenCalledTimes(0);
  });
});
