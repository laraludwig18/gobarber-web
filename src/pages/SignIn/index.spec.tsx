import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import SignIn from '.';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../context/auth', () => ({
  useAuth: () => ({
    signIn: mockedSignIn,
  }),
}));

jest.mock('../../context/toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('Digite seu e-mail');
    const passwordField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '212121' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedSignIn).toHaveBeenCalledWith({
        email: 'johndoe@example.com',
        password: '212121',
      });

      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('Digite seu e-mail');
    const passwordField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '212121' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();

      expect(getByText('Digite um email válido')).toBeTruthy();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementationOnce(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('Digite seu e-mail');
    const passwordField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '212121' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();

      expect(mockedAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      });
    });
  });
});
