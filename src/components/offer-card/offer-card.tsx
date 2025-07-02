import {memo} from 'react';
import {Link} from 'react-router-dom';
import {OfferListItem} from '@/types/offers';
import {
  AppRoute,
  MAX_RATING,
  ClassByTypeCard,
  ClassByTypeButton,
} from '@/constants';
import {useAppDispatch} from '@/hooks';
import {setOfferId} from '@/store/user/user.slice';
import BookmarkButton from '../bookmark-button/bookmark-button';

interface OfferCardProps {
  id: OfferListItem['id'];
  title: OfferListItem['title'];
  type: OfferListItem['type'];
  price: OfferListItem['price'];
  isPremium: OfferListItem['isPremium'];
  rating: OfferListItem['rating'];
  previewImage: OfferListItem['previewImage'];
  cardClassName: string;
}

const typesCard = {
  [ClassByTypeCard.MainPageCardType]: {
    className: ClassByTypeCard.MainPageCardType,
    size: {
      width: 260,
      height: 200
    }
  },
  [ClassByTypeCard.FavoritesPageCardType]: {
    className: ClassByTypeCard.FavoritesPageCardType,
    size: {
      width: 150,
      height: 110
    }
  },
  [ClassByTypeCard.OfferPageCardType]: {
    className: ClassByTypeCard.OfferPageCardType,
    size: {
      width: 260,
      height: 200
    }
  }
};

export default function OfferCard(
  {
    id,
    title,
    type,
    price,
    isPremium,
    rating,
    previewImage,
    cardClassName,
  }: OfferCardProps): JSX.Element {
  const roundedRating = Math.round(rating);
  const MemoBookmarkButton = memo(BookmarkButton);

  const dispatch = useAppDispatch();

  const {className, size} = typesCard[cardClassName];
  const shouldHover = cardClassName === ClassByTypeCard.MainPageCardType;

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={() => {
        if (shouldHover) {
          dispatch(setOfferId(id));
        }
      }}
      onMouseLeave={() => {
        if (shouldHover) {
          dispatch(setOfferId());
        }
      }}
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link
          to={`${AppRoute.Offer}/${id}`}
        >
          <img
            className="place-card__image"
            src={previewImage}
            alt="Place image"
            {...size}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <MemoBookmarkButton
            id={id}
            buttonClassName={ClassByTypeButton.OfferCardButtonType}
          />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              data-testid="rating-stars"
              style={{
                width: `${roundedRating * (100 / MAX_RATING)}%`
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`${AppRoute.Offer}/${id}`}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  );
}
