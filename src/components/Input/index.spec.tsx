import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { FiMail } from 'react-icons/fi';

import Input from '.';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: 'email',
    defaultValue: '',
    error: '',
    registerField: jest.fn(),
  }),
}));

describe('Input Component', () => {
  it('should be able to render an input', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Digite seu e-mail" />,
    );

    expect(getByPlaceholderText('Digite seu e-mail')).toBeTruthy();
  });

  it('should be able to render an input with an icon', async () => {
    const { getByTestId } = render(
      <Input name="email" placeholder="Digite seu e-mail" icon={FiMail} />,
    );

    expect(getByTestId('inputIcon')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="Digite seu e-mail" />,
    );

    const inputElement = getByPlaceholderText('Digite seu e-mail');
    const containerElement = getByTestId('inputContainer');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep color when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="Digite seu e-mail" />,
    );

    const inputElement = getByPlaceholderText('Digite seu e-mail');
    const containerElement = getByTestId('inputContainer');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
