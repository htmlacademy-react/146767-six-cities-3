import ReviewItem from '@/components/review-item/review-item';
import {Comment} from '@/types/offers';

interface ReviewsListProps {
  comments?: Comment[];
}

export default function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;&nbsp;
        <span className="reviews__amount">
          {comments?.length}
        </span>
      </h2>

      <ul className="reviews__list">
        {
          comments?.map((comment) => (
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
    </>
  );
}
