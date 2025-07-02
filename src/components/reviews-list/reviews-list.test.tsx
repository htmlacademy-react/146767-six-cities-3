import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {State} from '@/types/state';
import {withStore} from '@/utils/mock-component';
import {makeMockComments} from '@/utils/mocks';
import {Comment} from '@/types/offers';
import {
  MAX_COMMENTS,
  NameSpace,
  RequestStatus
} from '@/constants';
import ReviewsList from './reviews-list';

describe('ReviewsList component', () => {
  const dataTestId = 'review-item';
  const mockComments = [makeMockComments()];

  let mockInitialState: Pick<State, NameSpace.Comments>;

  beforeEach(() => {
    mockInitialState = {
      [NameSpace.Comments]: {
        comments: mockComments,
        errorMessage: null,
        commentsStatus: RequestStatus.Succeeded,
        PostCommentStatus: RequestStatus.Idle,
      },
    };
  });

  it('should correct number of reviews', () => {
    const {withStoreComponent} = withStore(
      <ReviewsList />,
      mockInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getAllByTestId(dataTestId))
      .toHaveLength(Math.min(mockComments.length, MAX_COMMENTS));
  });

  it('should viewed limits reviews to "MAX_COMMENTS"', () => {
    const manyComments: Comment[] = [];
    const mockComment = makeMockComments();

    for (let i = 0; i < MAX_COMMENTS + 1; i++) {
      manyComments.push({
        ...mockComment,
        id: `${i}`,
      });
    }

    const updatedInitialState = {
      ...mockInitialState,
      [NameSpace.Comments]: {
        ...mockInitialState[NameSpace.Comments],
        comments: manyComments,
      }
    };

    const {withStoreComponent} = withStore(
      <ReviewsList />,
      updatedInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.getAllByTestId(dataTestId))
      .toHaveLength(MAX_COMMENTS);
  });

  it('should renders nothing when no comments', () => {
    const updatedInitialState = {
      ...mockInitialState,
      [NameSpace.Comments]: {
        ...mockInitialState[NameSpace.Comments],
        comments: [],
      }
    };

    const {withStoreComponent} = withStore(
      <ReviewsList />,
      updatedInitialState
    );

    render(
      <BrowserRouter>
        {withStoreComponent}
      </BrowserRouter>
    );

    expect(screen.queryByTestId(dataTestId)).not.toBeInTheDocument();
  });
});
