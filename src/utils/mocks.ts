import {ExtraArgument, State} from '@/types/state';
import {Action} from 'redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {UserData} from '@/types/user-data';
import {AuthData} from '@/types/auth-data';
import {CommentData} from '@/types/comment-data';
import {Comment, FullOfferItem, OfferListItem} from '@/types/offers';
import {FavoriteData} from '@/types/favorite-data';
import {ReviewItemProps} from '@/components/review-item/types';
import {
  NameSpace,
  RequestStatus,
  AuthorizationStatus,
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
} from '@/constants';

export type AppThunkDispatch = ThunkDispatch<State, ExtraArgument, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

const MockImages = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
];

const Goods = [
  'Wi-Fi',
  'Towels',
  'Kitchen',
  'Dishwasher',
];

const Location = {
  latitude: 0,
  longitude: 0,
  zoom: 10
};

const City = {
  location: Location,
  name: 'City',
};

const User = {
  isPro: true,
  name: 'name',
  avatarUrl: '/avatar.jpg',
};

const MockUserData: UserData = {
  ...User,
  token: 'token',
  email: 'email',
};

export const MockAuthData: AuthData = {
  login: 'login',
  password: 'password',
};

export const MockFavoriteData: FavoriteData = {
  id: 'id',
  status: 1,
};

export const MockCommentData: CommentData = {
  id: 'id',
  comment: 'comment',
  rating: 5,
};

const MockComment: Comment = {
  id: 'id',
  rating: 5,
  user: User,
  date: '2025-01-01T12:00:00.789Z',
  comment: 'comment',
};

const MockOfferInfo = {
  id: 'id',
  title: 'title',
  type: 'room',
  isPremium: true,
  rating: 5,
  price: 100,
  bedrooms: 2,
  goods: Goods,
  maxAdults: 3,
};

const MockReview: ReviewItemProps = {
  isPro: true,
  userName: 'user name',
  avatarUrl: '/avatar.jpg',
  comment: 'comment',
  date: '2025-01-01T12:00:00.789Z',
  rating: 5,
};

const MockOffer: OfferListItem = {
  id: 'id',
  title: 'title',
  type: 'room',
  price: 100,
  rating: 5,
  city: City,
  location: Location,
  isFavorite: false,
  isPremium: false,
  previewImage: 'img.jpg',
};

const MockFullOffer: FullOfferItem = {
  ...MockOffer,
  host: User,
  bedrooms: 1,
  maxAdults: 1,
  goods: [],
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  description: 'description',
};

export const makeMockUser = () => User;

export const makeMockImages = () => MockImages;

export const makeMockOfferInfo = () => MockOfferInfo;

export const makeMockReview = () => MockReview;

export const makeMockComments = () => MockComment;

export const makeMockOffers = () => MockOffer;

export const makeMockFullOffer = () => MockFullOffer;

export const makeMockUserData = () => MockUserData;

export const makeMockCommentData = () => MockCommentData;

export const makeMockAuthData = () => MockAuthData;

export const makeMockFavoriteData = () => MockFavoriteData;

export const makeMockFavorites = makeMockOffers;

export const makeMockOffersNearby = makeMockOffers;

export const makeMockStore = (initialState?: Partial<State>): State => ({
  [NameSpace.Offers]: {
    offers: [],
    errorMessage: null,
    offersStatus: RequestStatus.Idle,
  },
  [NameSpace.FullOffer]: {
    fullOffer: null,
    errorMessage: null,
    fullOfferStatus: RequestStatus.Idle,
  },
  [NameSpace.Comments]: {
    comments: [],
    errorMessage: null,
    commentsStatus: RequestStatus.Idle,
    PostCommentStatus: RequestStatus.Idle,
  },
  [NameSpace.Favorites]: {
    favorites: [],
    favoritesStatus: RequestStatus.Idle,
  },
  [NameSpace.OffersNearby]: {
    offersNearby: [],
    errorMessage: null,
    offersNearbyStatus: RequestStatus.Idle,
  },
  [NameSpace.User]: {
    id: undefined,
    city: DEFAULT_CITY,
    sorting: DEFAULT_SORTING_TYPE,
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
    LoginStatus: RequestStatus.Idle,
  },
  ...initialState ?? {},
});
