import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {getAddedComment, getIsAuthStatus} from '@/store/user/user.selectors';
import {getUpdatedFavorite} from '@/store/favorites/favorites.selectors';
import {getFullOffer, selectFullOfferStatus} from '@/store/full-offer/full-offer.selectors';
import {getComments, selectCommentsStatus} from '@/store/comments/comments.selectors';
import {getOffersNearby, selectOffersNearbyStatus} from '@/store/offers-nearby/offers-nearby.selectors';
import {updatedFullOffer} from '@/store/full-offer/full-offer.slice';
import {fetchFullOfferAction} from '@/store/full-offer/full-offer.api';
import {fetchCommentsAction} from '@/store/comments/comments.api';
import {fetchOffersNearbyAction} from '@/store/offers-nearby/offers-nearby.api';
import {
  ClassByTypeCard,
  MAX_COMMENTS,
  MAX_NEAR_OFFERS,
  PageTitle,
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
  const addedComment = useAppSelector(getAddedComment);
  const updatedFavorite = useAppSelector(getUpdatedFavorite);
  const isAuth = useAppSelector(getIsAuthStatus);
  const isCommentLoadingError = !useAppSelector(selectCommentsStatus).isFailed;
  const isOffersNearbyLoadingError = !useAppSelector(selectOffersNearbyStatus).isFailed;
  const {isLoading, isFailed} = useAppSelector(selectFullOfferStatus);

  const {id} = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updatedFavorite) {
      dispatch(updatedFullOffer(updatedFavorite));
    }
  }, [updatedFavorite, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFullOfferAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchOffersNearbyAction(id));
    }
  }, [dispatch, id]);

  const commentsList = addedComment ?
    comments
      .concat([addedComment])
      .slice(0, MAX_COMMENTS) :
    comments
      .slice(0, MAX_COMMENTS);

  const nearOffersList = allOffersNearby.slice(0, MAX_NEAR_OFFERS - 1);
  const currentWithNearOffers = allOffersNearby.slice(0, MAX_NEAR_OFFERS);

  if (isFailed) {
    return <ErrorMessage/>;
  }

  if (isLoading || !fullOffer) {
    return <Preloader/>;
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
        <title>
          {PageTitle.OfferPage}
        </title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">

          <OfferGallery
            images={images}
          />

          <div className="offer__container container">
            <div className="offer__wrapper">

              {
                id &&
                  <OfferInfo
                    id={id}
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
              }

              <OfferHost
                host={host}
                description={description}
              />

              <section className="offer__reviews reviews">
                {
                  isCommentLoadingError &&
                  <ReviewsList
                    comments={commentsList}
                  />
                }
                {
                  isAuth &&
                  id && (
                    <ReviewsForm
                      id={id}
                    />
                  )
                }
              </section>
            </div>
          </div>
          <section className="offer__map map">
            {
              isOffersNearbyLoadingError &&
              <Map
                startPoint={fullOffer.city}
                points={currentWithNearOffers}
              />
            }
          </section>
        </section>
        {
          isOffersNearbyLoadingError &&
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
        }
      </main>
    </div>
  );
}
