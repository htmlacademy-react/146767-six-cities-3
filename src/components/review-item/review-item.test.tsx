import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {makeMockReview} from '@/utils/mocks';
import {MAX_RATING} from '@/constants';
import ReviewItem from './review-item';

describe('ReviewItem component', () => {
  const mockReview = makeMockReview();
  const DataTestId = {
    ratingStarsId: 'rating-stars',
    reviewTimeId: 'review-time',
  };
  const {ratingStarsId, reviewTimeId} = DataTestId;

  it('should render correctly with review data', () => {
    render(<ReviewItem {...mockReview} />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', mockReview.avatarUrl);
  });

  it('should render correct rating stars width', () => {
    const expectedWidth = (mockReview.rating * 100) / MAX_RATING;

    render(<ReviewItem {...mockReview} />);

    expect(screen.getByTestId(ratingStarsId)).toHaveStyle(`width: ${expectedWidth}%`);
  });

  it('should formats date correctly', () => {
    const expectedDate = new Date(mockReview.date);
    const formattedDate = expectedDate.toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
      });

    render(<ReviewItem {...mockReview} />);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should not render "Pro" badge when isPro is false', () => {
    render(<ReviewItem {...mockReview} isPro={false} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });

  it('has correct datetime attribute', () => {
    const expectedDate = new Date(mockReview.date).toISOString().slice(0, 10);

    render(<ReviewItem {...mockReview} />);

    expect(screen.getByTestId(reviewTimeId)).toHaveAttribute('datetime', expectedDate);
  });
});
