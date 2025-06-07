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

export const ClassByTypeButton = {
  OfferCardButtonType: 'place-card',
  FullOfferButtonType: 'offer',
};

export enum SortingType {
  Popular = 'Popular',
  PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  Rating = 'Top rated first'
}

export enum PageTitle {
  MainPage = '6 cities',
  OfferPage = '6 cities: offer',
  LoginPage = '6 cities: authorization',
  FavoritesPage = '6 cities: favorites',
  FavoritesPageEmpty = '6 cities: favorites empty',
  PageNotFound = '6 cities: page not found',
}

export const DEFAULT_SORTING_TYPE = SortingType.Popular;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  OfferId = '/offer/:id',
  PageNotFound = '*',
}

export enum APIRoute {
  Offers = 'offers',
  Comments = 'comments',
  Nearby = 'nearby',
  Favorites = 'favorite',
  Login = 'login',
  Logout = 'logout',
}

export enum FavoriteStatus {
  Added = 1,
  Removed = 0
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Offers = 'OFFERS',
  FullOffer = 'FULL_OFFER',
  Comments = 'COMMENTS',
  OffersNearby = 'OFFERS_NEARBY',
  Favorites = 'FAVORITES',
  User = 'USER',
}

export enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
}

export enum RequestMessageError {
  CommentsLoadingFailed = 'Ошибка загрузки комментариев:',
  OffersNearbyLoadingFailed = 'Ошибка загрузки соседних объявлений:',
  OffersLoadingFailed = 'Ошибка загрузки объявлений:',
  FullOfferLoadingFailed = 'Ошибка загрузки объявления:',
  FavoritesLoadingFailed = 'Ошибка загрузки избранного:',
  FavoritesPostingFailed = 'Ошибка добавления объявления в избранное:',
}

export enum PostCommentNotification {
  CommentPostSuccess = 'Ваш комментарий отправлен',
  CommentPostFailed = 'Ошибка отправки комментария',
}

export enum AuthNotification {
  AuthUnknown = 'Вы не авторизованы',
  AuthSuccess = 'Авторизация успешна',
  AuthFailed = 'Авторизация не удалась',
  LogoutSuccess = 'Вы вышли из системы',
  LogoutFailed = 'Ошибка выхода из системы',
}
