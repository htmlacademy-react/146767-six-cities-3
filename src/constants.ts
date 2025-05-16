export const MAX_RATING = 5;
export const MAX_COMMENTS = 10;
export const MAX_NEAR_OFFERS = 4;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
const START_LOCATION_INDEX = 0;

export const LOCATIONS = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY = LOCATIONS[START_LOCATION_INDEX];

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

export enum SortingType {
  popular = 'Popular',
  priceUp = 'Price: low to high',
  priceDown = 'Price: high to low',
  rating = 'Top rated first'
}

export const DEFAULT_SORTING_TYPE = SortingType.popular;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
  OfferId = '/offer/:id',
  PageNotFound = '/*',
}

export enum APIRoute {
  Offers = '/offers/',
  Comments = '/comments/',
  Nearby = '/nearby',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Load = 'LOAD',
  User = 'USER',
}
