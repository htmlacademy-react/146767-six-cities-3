import clsx from 'clsx';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '@/hooks';
import {getSortedOffers} from '@/utils';
import {getCurrentCity, getCurrentSorting} from '@/store/user-action/selectors';
import {getError, getOffers} from '@/store/load-action/selectors';
import {ClassByTypeCard} from '@/constants';
import Header from '@/components/header/header';
import NavList from '@/components/nav-list/nav-list';
import PlacesEmpty from '@/components/places-empty/places-empty';
import PlacesSorting from '@/components/places-sorting/places-sorting';
import OffersList from '@/components/offers-list/offers-list';
import Map from '@/components/map/map';
import Preloader from '@/components/preloader/preloader';
import ErrorMessage from '@/components/error-message/error-message';

export default function MainPage(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const currentSorting = useAppSelector(getCurrentSorting);
  const offers = useAppSelector(getOffers);
  const error = useAppSelector(getError);

  if (error) {
    return <ErrorMessage/>;
  }

  if (!offers) {
    return <Preloader/>;
  }

  const getFilterOffers = (city: string) => offers.filter(
    (offer) => offer.city.name === city
  );

  const filteredOffers = getFilterOffers(currentCity);
  const isOffersList = filteredOffers[0];
  const sortedOffers = getSortedOffers(currentSorting, filteredOffers);

  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Главная страница</title>
      </Helmet>

      <Header />

      <main
        className={clsx(
          'page__main page__main--index',
          !isOffersList && 'page__main--index-empty'
        )}
      >
        <h1 className="visually-hidden">Cities</h1>

        <NavList
          city={currentCity}
        />

        <div className="cities">
          <div
            className={clsx(
              'cities__places-container container',
              !isOffersList && 'cities__places-container--empty'
            )}
          >
            {
              !isOffersList && (
                <PlacesEmpty
                  cityName={currentCity}
                />
              )
            }
            {
              isOffersList && (
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">
                      {filteredOffers.length} places to stay in {currentCity}
                    </b>

                    <PlacesSorting />
                    <OffersList
                      offers={sortedOffers}
                      cardClassName={ClassByTypeCard.MainPageCardType}
                    />

                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map">

                      <Map
                        points={filteredOffers}
                        startPoint={filteredOffers[0].city}
                      />

                    </section>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
}
