export interface OfferListItem extends ListItem {
  previewImage: string;
}

export interface FullOfferItem extends ListItem {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export interface Host {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

interface ListItem {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface City {
  name: string;
  location: Location;
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Comment {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

interface User {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}
