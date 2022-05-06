import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('teste da tela Profile', () => {
  it('testa se o header é renderizado de forma correta', () => {
    renderWithRouterAndStore(<Profile />);
    const profileHeader = screen.getByRole('heading', { name: /profile/i });
    expect(profileHeader).toBeInTheDocument();
  });
  it('testa se o botão Done Recipies está na tela', () => {
    const { history } = renderWithRouterAndStore(<Profile />);
    const doneRecipes = screen.getByText(/done recipes/i);
    expect(doneRecipes).toBeInTheDocument();
    userEvent.click(doneRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('testa se o botão Favorite Recipies está na tela', () => {
    const { history } = renderWithRouterAndStore(<Profile />);
    const favoriteRecipes = screen.getByText(/favorite recipes/i);
    expect(favoriteRecipes).toBeInTheDocument();
    userEvent.click(favoriteRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('testa se o botão Logout está na tela', () => {
    const { history } = renderWithRouterAndStore(<Profile />);
    const Logout = screen.getByText(/Logout/i);
    expect(Logout).toBeInTheDocument();
    userEvent.click(Logout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
