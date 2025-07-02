import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {AppThunkDispatch, makeMockStore} from '@/utils/mocks';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {act} from 'react-dom/test-utils';
import LoginForm from './login-form';

describe('Component: Login Form', () => {
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
        <LoginForm />
      </Provider>
    );
  };

  it('should renders correctly', () => {
    renderWithProviders();

    expect(screen.getAllByText(/sign in/i)).toHaveLength(2);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    renderWithProviders();

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows validation error for invalid email', async () => {
    renderWithProviders();

    const emailInput = screen.getByPlaceholderText('Email');

    await act(async () => {
      await userEvent.type(emailInput, 'invalid-email');
    });

    expect(screen.getByText(/введен не корректный e-mail/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid password', async () => {
    renderWithProviders();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'pass');
    });

    expect(screen.getByText(/пароль должен состоять минимум из одной буквы и цифры/i)).toBeInTheDocument();
  });

  it('enables submit button when form is valid', async () => {
    renderWithProviders();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');
      await userEvent.tab();
    });

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeEnabled();
  });
});
