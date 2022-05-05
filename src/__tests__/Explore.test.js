import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/Explore';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('testa a tela explore', () => {
  it('testa se o header é renderizado de forma correta', () => {
    const { history } = renderWithRouterAndStore(<Explore />);
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId('page-title');
    expect(title.innerHTML).toBe('Explore');
    userEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('testa se o botão explore foods foi renderizado', () => {
    const { history } = renderWithRouterAndStore(<Explore />);
    const exploreFoodsButton = screen.getByTestId('explore-foods');
    expect(exploreFoodsButton).toBeInTheDocument();
    userEvent.click(exploreFoodsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });
  it('testa se o botão explore drinks foi renderizado', () => {
    const { history } = renderWithRouterAndStore(<Explore />);
    const exploreDrinksButton = screen.getByTestId('explore-drinks');
    expect(exploreDrinksButton).toBeInTheDocument();
    userEvent.click(exploreDrinksButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });
  it('testa se o footer foi renderizado', () => {
    renderWithRouterAndStore(<Explore />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const foodsButton = screen.getByTestId('drinks-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    expect(foodsButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });
});
