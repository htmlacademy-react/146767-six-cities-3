import ReviewItem from '@/components/review-item/review-item';
import {Comment} from '@/types/offers';

interface ReviewsListProps {
  comments: Comment[];
}

export default function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        comments.map((comment) => (
          <ReviewItem
            key={comment.id}
            date={comment.date}
            userName={comment.user.name}
            avatarUrl={comment.user.avatarUrl}
            isPro={comment.user.isPro}
            comment={comment.comment}
            rating={comment.rating}
          />
        ))
      }
    </ul>
  );
}
