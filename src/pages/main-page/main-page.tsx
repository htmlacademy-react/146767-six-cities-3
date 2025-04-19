import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {cityСhange, searchOffers} from '@/store/action';
import {ClassByTypeCard} from '@/constants';
import Header from '@/components/header/header';
import NavList from '@/components/nav-list/nav-list';
import PlacesSorting from '@/components/places-sorting/places-sorting';
import OffersList from '@/components/offers-list/offers-list';
import Map from '@/components/map/map';

export default function MainPage(): JSX.Element {
  const [selectedPointId, setSelectedPointId] = useState<string | undefined>(undefined);

  const currentCity = useAppSelector((state) => state.city);
  const offersForCity = useAppSelector((state) => state.offers);
  const isOffersList = offersForCity[0];
  const dispatch = useAppDispatch();

  const getSelectedPointId = (id: string | null) => {
    setSelectedPointId(
      typeof id === 'string' ? id : undefined
    );
  };

  const handleCityChangeClick = (city: string): void => {
    dispatch(cityСhange(city));
    dispatch(searchOffers());
  };

  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Главная страница</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <NavList
          city={currentCity}
          onCityChangeClick={handleCityChangeClick}
        />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {offersForCity.length} places to stay in {currentCity}
              </b>
              {
                isOffersList && (
                  <>
                    <PlacesSorting />
                    <OffersList
                      offers={offersForCity}
                      cardClassName={ClassByTypeCard.MainPageCardType}
                      onCardAction={getSelectedPointId}
                    />
                  </>
                )
              }
            </section>
            {
              isOffersList && (
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      points={offersForCity}
                      startPoint={offersForCity[0].city}
                      selectedPointId={selectedPointId}
                    />
                  </section>
                </div>
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
}
