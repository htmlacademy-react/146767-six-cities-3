import {Link} from 'react-router-dom';
import {useAppDispatch} from '@/hooks';
import {OfferListItem} from '@/types/offers';
import {changeCity, changeSorting} from '@/store/user-action/user-action';
import {AppRoute, ClassByTypeCard, DEFAULT_SORTING_TYPE} from '@/constants';
import OffersList from '@/components/offers-list/offers-list';

interface FavoritesItemProps {
  offers: OfferListItem[];
  location: string;
}

export default function FavoriteItem({offers, location}: FavoritesItemProps): JSX.Element | null {
  const dispatch = useAppDispatch();

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
          <Link
            to={AppRoute.Root}
            className="locations__item-link"
            onClick={
              () => {
                dispatch(changeCity(location));
                dispatch(changeSorting(DEFAULT_SORTING_TYPE));
              }
            }
          >
            <span>
              {location}
            </span>
          </Link>
        </div>
      </div>

      <OffersList
        offers={cityOffers}
        cardClassName={ClassByTypeCard.FavoritesPageCardType}
      />

    </li>
  );
}
