import {
  useState,
  ChangeEvent,
  Fragment,
  useEffect,
  useRef
} from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {getPostCommentStatus} from '@/store/comments/comments.selectors';
import {postCommentAction} from '@/store/comments/comments.api';
import {OfferRatings, RequestStatus} from '@/constants';

interface ReviewFormProps {
  id: string;
}

const enum TextButtonSubmit {
  SUBMIT = 'Submit',
  IN_PROGRESS = 'Submitting…',
}

export default function ReviewForm({id}: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    review: '',
    rating: ''
  });

  const {review, rating: currentRating} = formData;

  const formRef = useRef<HTMLFormElement>(null);
  const addedCommentStatus = useAppSelector(getPostCommentStatus);

  const dispatch = useAppDispatch();

  const isSubmitting = addedCommentStatus === RequestStatus.Loading;
  const isSubmittingSuccess = addedCommentStatus === RequestStatus.Succeeded;

  const isRatingValid = (
    Number(currentRating) >= 1 &&
    Number(currentRating) <= 5
  );
  const isReviweValid = (
    review.length >= 50 &&
    review.length <= 300
  );
  const isValidForm = isRatingValid && isReviweValid;

  useEffect(() => {
    if (isSubmittingSuccess && formRef.current) {
      setFormData({
        review: '',
        rating: '',
      });

      formRef.current.reset();
    }
  }, [isSubmittingSuccess]);

  const handleFormChange = (evt:
    ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const getRatingList = () =>
    OfferRatings.map(({title, rating}) => (
      <Fragment key={rating}>
        <input
          className="form__rating-input visually-hidden"
          id={`${rating}-stars`}
          name="rating"
          value={rating}
          type="radio"
          disabled={isSubmitting}
          onChange={handleFormChange}
        />
        <label
          className="reviews__rating-label form__rating-label"
          htmlFor={`${rating}-stars`}
          title={title}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    ));

  const handleFormSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValidForm) {
      return;
    }

    dispatch(postCommentAction({
      id,
      comment: review,
      rating: Number(currentRating),
    }));
  };

  return (
    <form
      ref={formRef}
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {getRatingList()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isSubmitting}
        onChange={handleFormChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          &thinsp;
          <span className="reviews__star">
            rating
          </span> and describe your stay with at least
          &thinsp;
          <b className="reviews__text-amount">
            50 characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidForm || isSubmitting}
        >
          {
            isSubmitting ?
              TextButtonSubmit.IN_PROGRESS :
              TextButtonSubmit.SUBMIT
          }
        </button>
      </div>
    </form>
  );
}
