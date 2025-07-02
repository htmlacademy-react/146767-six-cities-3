import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import {router} from '@/services/router';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {AppThunkDispatch, makeMockStore} from '@/utils/mocks';
import {OfferRatings} from '@/constants';
import ReviewForm from './review-form';

describe('ReviewForm component', () => {
  const mockId = 'test-id';

  const axios = createAPI();
  const mockStore = makeMockStore();
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const renderWithProviders = () => {
    const store = mockStoreCreator({
      ...mockStore,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm id={mockId} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should renders correctly with all form elements', () => {
    renderWithProviders();

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should renders all rating options', () => {
    renderWithProviders();

    OfferRatings.forEach(({ title }) => {
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });

  it('should renders help text with requirements', () => {
    renderWithProviders();

    expect(screen.getByText(/To submit review/i)).toBeInTheDocument();
    expect(screen.getByText('rating')).toBeInTheDocument();
    expect(screen.getByText('50 characters')).toBeInTheDocument();
  });

  it('should renders submit button as enabled when form is not submitting', () => {
    renderWithProviders();

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('should renders form with empty initial values', () => {
    renderWithProviders();

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');

    OfferRatings.forEach(({ rating }) => {
      const radioInput = screen.getByDisplayValue(rating.toString());
      expect(radioInput).not.toBeChecked();
    });
  });
});
