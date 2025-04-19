export const MAX_RATING = 5;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
const START_LOCATION_INDEX = 0;

export const Locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY = Locations[START_LOCATION_INDEX];

export const OfferRatings = [
  {
    title: 'perfect',
    rating: 5
  },
  {
    title: 'good',
    rating: 4
  },
  {
    title: 'not bad',
    rating: 3
  },
  {
    title: 'badly',
    rating: 2
  },
  {
    title: 'terribly',
    rating: 1
  }
];

export const ClassByTypeCard = {
  MainPageCardType: 'cities',
  OfferPageCardType: 'near-places',
  FavoritesPageCardType: 'favorites',
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
  OfferId = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
