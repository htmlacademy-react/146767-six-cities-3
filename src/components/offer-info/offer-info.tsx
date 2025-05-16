import clsx from 'clsx';
import {MAX_RATING} from '@/constants';

interface OfferInfoProps {
  title: string;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  price: number;
  bedrooms: number;
  goods: string[];
  maxAdults: number;
}

export default function OfferInfo({
  title,
  type,
  isPremium,
  isFavorite,
  rating,
  price,
  bedrooms,
  goods,
  maxAdults
}: OfferInfoProps): JSX.Element {

  return (
    <>
      {
        isPremium && (
          <div className="offer__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <button
          className={clsx(
            'offer__bookmark-button button',
            isFavorite && 'offer__bookmark-button--active'
          )}
          type="button"
        >
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span
            style={{
              width: `${rating * (100 / MAX_RATING)}%`
            }}
          >
          </span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">
          {rating}
        </span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
        <li className="offer__feature offer__feature--adults">
            Max {maxAdults} adults
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {
            goods.map((good) => (
              <li
                className="offer__inside-item"
                key={good}
              >
                {good}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}
