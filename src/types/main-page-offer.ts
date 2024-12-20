import { City } from './city';
import { Location } from './location';

export type MainPageOffer = {
  id: string;
  title: string;
  city: City;
  location: Location;
  previewImage: string;
  rating: number;
  price: number;
  type: string;
  isPremium: boolean;
  isFavourite: boolean;
}

export type MainPageOffers = MainPageOffer[]
