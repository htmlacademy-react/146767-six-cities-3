import {MAX_RATING} from '@/constants';
import {
  DateOptionsType,
  ReviewItemProps
} from './types';

const DateOptions: DateOptionsType = {
  language: {
    english: 'en-US'
  },
  options: {
    month: 'long',
    year: 'numeric',
  }
};

export default function ReviewItem(
  {
    date,
    userName,
    avatarUrl,
    isPro,
    comment,
    rating
  }: ReviewItemProps): JSX.Element {

  const dateTime = new Date(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {userName}
        </span>
        {
          isPro && (
            <span className="offer__user-status">
              Pro
            </span>
          )
        }
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: `${rating * (100 / MAX_RATING)}%`
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time
          className="reviews__time"
          dateTime={dateTime.toISOString().slice(0, 10)}
        >
          {
            dateTime.toLocaleDateString(
              DateOptions.language.english,
              DateOptions.options
            )
          }
        </time>
      </div>
    </li>
  );
}
