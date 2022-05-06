import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('teste pagina de login', () => {
  it('testa se existe o input de email', () => {
    renderWithRouterAndStore(<Login />);
    const emailInput = screen.getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();
  });
  it('testa se existe o input de senha', () => {
    renderWithRouterAndStore(<Login />);
    const emailPassword = screen.getByPlaceholderText('Senha');
    expect(emailPassword).toBeInTheDocument();
  });
  it('testa se existe botão de entrar', () => {
    renderWithRouterAndStore(<Login />);
    const loginButton = screen.getByRole('button');
    expect(loginButton).toBeInTheDocument();
  });
  it('testa se o botão de entrar está desativado antes de colocar um email', () => {
    renderWithRouterAndStore(<Login />);
    const loginButton = screen.getByRole('button');
    expect(loginButton.disabled).toBe(true);
  });
  it('testa se o botão de entrar está ativado depois de digitar email e senha', () => {
    renderWithRouterAndStore(<Login />);
    const emailTest = 'mail@mail.com';
    const passwordTest = 'password';
    const emailInput = screen.getByPlaceholderText('E-mail');
    const emailPassword = screen.getByPlaceholderText('Senha');
    userEvent.type(emailInput, emailTest);
    userEvent.type(emailPassword, passwordTest);
    const loginButton = screen.getByRole('button');
    expect(loginButton.disabled).toBe(false);
  });
  it('testa se o botão de entrar redireciona para /foods', () => {
    const { history } = renderWithRouterAndStore(<Login />);
    const emailTest = 'mail@mail.com';
    const passwordTest = 'password';
    const emailInput = screen.getByPlaceholderText('E-mail');
    const emailPassword = screen.getByPlaceholderText('Senha');
    userEvent.type(emailInput, emailTest);
    userEvent.type(emailPassword, passwordTest);
    const loginButton = screen.getByRole('button');
    expect(loginButton.disabled).toBe(false);
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
