import {Comment} from '@/types/offers';

export interface ReviewItemProps {
  date: Comment['date'];
  userName: Comment['user']['name'];
  avatarUrl: Comment['user']['avatarUrl'];
  isPro: Comment['user']['isPro'];
  comment: Comment['comment'];
  rating: Comment['rating'];
}

export interface DateOptionsType {
  language: Language;
  options: Options;
}

interface Language {
  english: 'en-US';
}

interface Options {
  month: 'long';
  year: 'numeric';
}
