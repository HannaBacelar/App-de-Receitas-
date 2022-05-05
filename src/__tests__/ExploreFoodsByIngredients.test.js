import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoodsByIngredients from '../pages/ExploreFoodsByIngredients';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';
import fetchMock from '../../cypress/mocks/fetch';

const mealIngredients = require('../../cypress/mocks/mealIngredients');

describe('testa a tela explore foods by ingredients', () => {
  it('testa se o header é renderizado de forma correta', () => {
    const { history } = renderWithRouterAndStore(<ExploreFoodsByIngredients />);
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId('page-title');
    expect(title.innerHTML).toBe('Explore Ingredients');
    userEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('testa os cards', async () => {
    global.fetch = jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);
    const { history } = renderWithRouterAndStore(<ExploreFoodsByIngredients />);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const ingredientCards = await screen.findAllByTestId(/-ingredient-card/);
    const maxCards = 12;
    expect(ingredientCards).toHaveLength(maxCards);
    const { meals } = mealIngredients;
    ingredientCards.forEach((element, index) => {
      expect(element.type).toBe('button');
      expect(element.value).toEqual(meals[index].strIngredient);
    });
    userEvent.click(ingredientCards[0]);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
