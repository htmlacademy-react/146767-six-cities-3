import {OfferListItem} from '@/types/offers';
import {ClassByTypeCard} from '@/constants';
import OffersList from '@/components/offers-list/offers-list';

interface FavoritesItemProps {
  offers: OfferListItem[];
  location: string;
}

export default function FavoriteItem({offers, location}: FavoritesItemProps): JSX.Element | null {
  const cityOffers = offers.filter((offer) => {
    if (offer.city) {
      return offer.city.name === location;
    }
  });

  if (!cityOffers.length) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{location}</span>
          </a>
        </div>
      </div>

      <OffersList
        offers={cityOffers}
        cardClassName={ClassByTypeCard.FavoritesPageCardType}
      />

    </li>
  );
}
