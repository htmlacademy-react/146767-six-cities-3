import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {resetFullOffer} from '@/store/load-action/load-action';
import {fetchCommentsAction, fetchFullOfferAction, fetchOffersNearbyAction} from '@/store/api-actions';
import {
  getFullOffer,
  getComments,
  getOffersNearby,
  getError,
} from '@/store/load-action/selectors';
import {
  ClassByTypeCard,
  MAX_COMMENTS,
  MAX_NEAR_OFFERS,
} from '@/constants';
import Header from '@/components/header/header';
import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewsForm from '@/components/review-form/review-form';
import Map from '@/components/map/map';
import OfferGallery from '@/components/offer-gallery/offer-gallery';
import OfferInfo from '@/components/offer-info/offer-info';
import OfferHost from '@/components/offer-host/offer-host';
import OffersList from '@/components/offers-list/offers-list';
import Preloader from '@/components/preloader/preloader';
import ErrorMessage from '@/components/error-message/error-message';

export default function OfferPage(): JSX.Element {
  const fullOffer = useAppSelector(getFullOffer);
  const allOffersNearby = useAppSelector(getOffersNearby);
  const comments = useAppSelector(getComments);
  const error = useAppSelector(getError);

  const {id} = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFullOffer());

    if (id) {
      dispatch(fetchFullOfferAction(id));
      dispatch(fetchOffersNearbyAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);

  const commentsList = comments?.slice(0, MAX_COMMENTS);
  const nearOffersList = allOffersNearby?.slice(0, MAX_NEAR_OFFERS - 1);
  const currentWithNearOffers = allOffersNearby?.slice(0, MAX_NEAR_OFFERS);

  if (error && !fullOffer) {
    return <ErrorMessage/>;
  }

  if (!fullOffer) {
    return (
      <Preloader />
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

          <OfferGallery
            images={images}
          />

          <div className="offer__container container">
            <div className="offer__wrapper">

              <OfferInfo
                title={title}
                type={type}
                isPremium={isPremium}
                isFavorite={isFavorite}
                rating={rating}
                price={price}
                bedrooms={bedrooms}
                goods={goods}
                maxAdults={maxAdults}
              />

              <OfferHost
                host={host}
                description={description}
              />

              <section className="offer__reviews reviews">
                {
                  error && !comments && (
                    <h2 className="reviews__title">
                      Ошибка загрузки комментариев: {error}
                    </h2>
                  )
                }
                {
                  comments && (
                    <ReviewsList
                      comments={commentsList}
                    />
                  )
                }

                <ReviewsForm />

              </section>
            </div>
          </div>
          {
            error && !allOffersNearby && (
              <h2 className="reviews__title">
                Ошибка загрузки карты: {error}
              </h2>
            )
          }
          {
            allOffersNearby && (
              <section className="offer__map map">

                <Map
                  startPoint={fullOffer.city}
                  points={currentWithNearOffers}
                />

              </section>
            )
          }
        </section>
        {
          allOffersNearby && (
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>

                <OffersList
                  offers={nearOffersList}
                  cardClassName={ClassByTypeCard.OfferPageCardType}
                />

              </section>
            </div>
          )
        }
      </main>
    </div>
  );
}
