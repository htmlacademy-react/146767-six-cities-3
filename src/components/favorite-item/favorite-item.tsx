import {memo} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '@/hooks';
import {OfferListItem} from '@/types/offers';
import {changeCity, changeSorting} from '@/store/user/user.slice';
import {AppRoute, ClassByTypeCard, DEFAULT_SORTING_TYPE} from '@/constants';
import OffersList from '@/components/offers-list/offers-list';

interface FavoritesItemProps {
  offers: OfferListItem[];
  location: string;
}

export default function FavoriteItem({offers, location}: FavoritesItemProps): JSX.Element | null {
  const MemoOfferList = memo(OffersList);

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
    <li
      className="favorites__locations-items"
      data-testid="favorite-item"
    >
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

      <MemoOfferList
        offers={cityOffers}
        cardClassName={ClassByTypeCard.FavoritesPageCardType}
      />

    </li>
  );
}
