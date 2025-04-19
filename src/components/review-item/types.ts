import {Comment} from '@/types/offers';

export interface ReviewItemProps {
  date: Comment['date'];
  userName: Comment['user']['name'];
  avatarUrl: Comment['user']['avatarUrl'];
  isPro: Comment['user']['isPro'];
  comment: Comment['comment'];
  rating: Comment['rating'];
}
