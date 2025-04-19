import clsx from 'clsx';
import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams, Navigate} from 'react-router-dom';
import {MAX_RATING, ClassByTypeCard} from '@/constants';
import {OfferListItem, FullOfferItem, Comment} from '@/types/offers';
import Header from '@/components/header/header';
import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewsForm from '@/components/review-form/review-form';
import Map from '@/components/map/map';
import OffersList from '@/components/offers-list/offers-list';

interface OfferPageProps {
  offers: OfferListItem[];
  fullOffer: FullOfferItem;
  comments: Comment[];
}

export default function OfferPage({offers, fullOffer, comments}:OfferPageProps): JSX.Element {
  const [selectedPointId, setSelectedPointId] = useState<string | undefined>(undefined);

  const getSelectedPointId = (id: string | null) => {
    setSelectedPointId(
      typeof id === 'string' ? id : undefined
    );
  };

  const {id} = useParams();
  const isOfferId = id === fullOffer.id;

  if (!isOfferId) {
    return (
      <Navigate to={'*'} />
    );
  }

  const {
    title,
    type,
    isPremium,
    isFavorite,
    rating,
    description,
    price,
    bedrooms,
    goods,
    host,
    images,
    maxAdults
  } = fullOffer;

  return (
    <div className="page">

      <Helmet>
        <title>6 cities | Предложения</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                images.map((image) => (
                  <div
                    className="offer__image-wrapper"
                    key={image}
                  >
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
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
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro && (
                      <span className="offer__user-status">
                        Pro
                      </span>
                    )
                  }
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;&nbsp;
                  <span className="reviews__amount">
                    {comments.length}
                  </span>
                </h2>

                <ReviewsList
                  comments={comments}
                />
                <ReviewsForm />

              </section>
            </div>
          </div>
          <section className="offer__map map">

            <Map
              startPoint={fullOffer.city}
              points={offers.slice(0, 3)}
              selectedPointId={selectedPointId}
            />

          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>

            <OffersList
              offers={offers.slice(0, 3)}
              cardClassName={ClassByTypeCard.OfferPageCardType}
              onCardAction={getSelectedPointId}
            />

          </section>
        </div>
      </main>
    </div>
  );
}
