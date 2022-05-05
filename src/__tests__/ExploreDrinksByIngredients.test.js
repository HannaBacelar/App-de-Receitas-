import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ExploreDrinksByIngredients from '../pages/ExploreDrinksByIngredients';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';
import fetchMock from '../../cypress/mocks/fetch';

const drinkIngredients = require('../../cypress/mocks/drinkIngredients');

describe('testa a tela explore foods by ingredients', () => {
  it('testa se o header é renderizado de forma correta', () => {
    const { history } = renderWithRouterAndStore(<ExploreDrinksByIngredients />);
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
    const { history } = renderWithRouterAndStore(<ExploreDrinksByIngredients />);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const ingredientCards = await screen.findAllByTestId(/-ingredient-card/);
    const maxCards = 12;
    expect(ingredientCards).toHaveLength(maxCards);
    const { drinks } = drinkIngredients;
    ingredientCards.forEach((element, index) => {
      expect(element.type).toBe('button');
      expect(element.value).toEqual(drinks[index].strIngredient1);
    });
    const firstIngredientCard = await screen.findByTestId('0-ingredient-card');
    await act(async () => userEvent.click(firstIngredientCard));
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
