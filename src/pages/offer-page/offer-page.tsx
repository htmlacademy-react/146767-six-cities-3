import {memo, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setOfferId} from '@/store/user/user.slice';
import {getIsAuthStatus} from '@/store/user/user.selectors';
import {getFullOffer, selectFullOfferStatus} from '@/store/full-offer/full-offer.selectors';
import {selectCommentsStatus} from '@/store/comments/comments.selectors';
import {getOffersNearby, selectOffersNearbyStatus} from '@/store/offers-nearby/offers-nearby.selectors';
import {fetchFullOfferAction} from '@/store/full-offer/full-offer.api';
import {fetchCommentsAction} from '@/store/comments/comments.api';
import {fetchOffersNearbyAction} from '@/store/offers-nearby/offers-nearby.api';
import {OfferListItem} from '@/types/offers';
import {
  ClassByTypeCard,
  MAX_NEAR_OFFERS,
  PageTitle,
} from '@/constants';
import Header from '@/components/header/header';
import ReviewsList from '@/components/reviews-list/reviews-list';
import ReviewForm from '@/components/review-form/review-form';
import Map from '@/components/map/map';
import OfferGallery from '@/components/offer-gallery/offer-gallery';
import OfferInfo from '@/components/offer-info/offer-info';
import OfferHost from '@/components/offer-host/offer-host';
import OffersList from '@/components/offers-list/offers-list';
import Preloader from '@/components/preloader/preloader';
import ErrorMessage from '@/components/error-message/error-message';

export default function OfferPage(): JSX.Element {
  const MemoHeader = memo(Header);
  const MemoReviewsList = memo(ReviewsList);
  const MemoReviewForm = memo(ReviewForm);
  const MemoMap = memo(Map);
  const MemoOfferGallery = memo(OfferGallery);
  const MemoOfferInfo = memo(OfferInfo);
  const MemoOfferHost = memo(OfferHost);
  const MemoOffersList = memo(OffersList);

  const fullOffer = useAppSelector(getFullOffer);
  const allOffersNearby = useAppSelector(getOffersNearby);
  const isAuth = useAppSelector(getIsAuthStatus);
  const isCommentLoadingError = !useAppSelector(selectCommentsStatus).isFailed;
  const isOffersNearbyLoadingError = !useAppSelector(selectOffersNearbyStatus).isFailed;
  const {isLoading, isFailed} = useAppSelector(selectFullOfferStatus);
  const {id} = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(setOfferId(id));
      dispatch(fetchFullOfferAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchOffersNearbyAction(id));
    }
  }, [dispatch, id]);

  const currentOffer: OfferListItem[] = fullOffer === null ? [] : [{
    id: fullOffer.id,
    title: fullOffer.title,
    price: fullOffer.price,
    type: fullOffer.type,
    isFavorite: fullOffer.isFavorite,
    isPremium: fullOffer.isPremium,
    city: fullOffer.city,
    location: fullOffer.location,
    rating: fullOffer.rating,
    previewImage: '',
  }];

  const nearOffersList = allOffersNearby.slice(0, MAX_NEAR_OFFERS);
  const currentWithNearOffers = [
    ...currentOffer,
    ...nearOffersList
  ];

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
    <div
      className="page"
      data-testid="offer-page"
    >

      <Helmet>
        <title>
          {PageTitle.OfferPage}
        </title>
      </Helmet>

      <MemoHeader />

      <main className="page__main page__main--offer">
        <section className="offer">

          <MemoOfferGallery
            images={images}
          />

          <div className="offer__container container">
            <div className="offer__wrapper">

              {
                id &&
                  <MemoOfferInfo
                    id={id}
                    title={title}
                    type={type}
                    isPremium={isPremium}
                    rating={rating}
                    price={price}
                    bedrooms={bedrooms}
                    goods={goods}
                    maxAdults={maxAdults}
                  />
              }

              <MemoOfferHost
                host={host}
                description={description}
              />

              <section className="offer__reviews reviews">
                {
                  isCommentLoadingError &&
                  <MemoReviewsList />
                }
                {
                  isAuth &&
                  id && (
                    <MemoReviewForm
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
              <MemoMap
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

              <MemoOffersList
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
