import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Route } from 'react-router-dom';
import fetchMock from '../../cypress/mocks/fetch';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import Details from '../pages/Details';
import renderWithRouterAndRedux from '../test-helpers/renderWithContext';

const meal = oneMeal.meals[0];
const drink = oneDrink.drinks[0];

describe('Página de Detalhes', () => {
  test('Testa se as duas requisições foram feitas corretamente para comida', async () => {
    global.fetch = jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);

    await act(async () => renderWithRouterAndRedux(
      <Route exact path="/foods/:id">
        <Details type="Meal" />
      </Route>, { initialEntries: [`/foods/${meal.idMeal}`] },
    ));
    console.log(`/foods/${meal.idMeal}`);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  test('Testa se as duas requisições foram feitas corretamente para bebida', async () => {
    global.fetch = jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);

    await act(async () => renderWithRouterAndRedux(
      <Route path="/drinks/:id">
        <Details type="Drink" />
      </Route>, { initialEntries: [`/drinks/${drink.idDrink}`] },
    ));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  test('Verifica se todos os elementos estão presentes e corretos na tela de comida',
    async () => {
      global.fetch = jest.spyOn(global, 'fetch')
        .mockImplementation(fetchMock);

      await act(async () => renderWithRouterAndRedux(
        <Route path="/foods/:id">
          <Details type="Meal" />
        </Route>, { initialEntries: [`/foods/${meal.idMeal}`] },
      ));

      const photo = await screen.findByTestId('recipe-photo');
      const title = await screen.findByTestId('recipe-title');
      const category = await screen.findByTestId('recipe-category');
      const shareBtn = await screen.findByTestId('share-btn');
      const favoriteBtn = await screen.findByTestId('favorite-btn');
      const video = await screen.findByTestId('video');
      const recommendations = await screen.findAllByTestId(/-recomendation-card/);
      expect(photo).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
      expect(video).toBeInTheDocument();

      expect(photo.src).toBe(meal.strMealThumb);
      expect(title).toHaveTextContent(meal.strMeal);
      expect(category).toHaveTextContent(meal.strCategory);
      expect(video.src).toBe(meal.strYoutube.replace('watch?v=', 'embed/'));

      const maxRecommendations = 6;
      expect(recommendations).toHaveLength(maxRecommendations);

      const maxIngredients = 20;
      for (let i = 1; i <= maxIngredients; i += 1) {
        if (meal[`strIngredient${i}`]) {
          const ingredient = screen
            .getByTestId(`${i - 1}-ingredient-name-and-measure`);
          expect(ingredient).toBeInTheDocument();
          expect(ingredient)
            .toHaveTextContent(
              `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
            );
        }
      }
    });

  test('Verifica se todos os elementos estão presentes e corretos na tela de bebida',
    async () => {
      global.fetch = jest.spyOn(global, 'fetch')
        .mockImplementation(fetchMock);

      await act(async () => renderWithRouterAndRedux(
        <Route path="/drinks/:id">
          <Details type="Drink" />
        </Route>, { initialEntries: [`/drinks/${drink.idDrink}`] },
      ));

      const photo = await screen.findByTestId('recipe-photo');
      const title = await screen.findByTestId('recipe-title');
      const category = await screen.findByTestId('recipe-category');
      const shareBtn = await screen.findByTestId('share-btn');
      const favoriteBtn = await screen.findByTestId('favorite-btn');
      const recommendations = await screen.findAllByTestId(/-recomendation-card/);
      expect(photo).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();

      expect(photo.src).toBe(drink.strDrinkThumb);
      expect(title).toHaveTextContent(drink.strDrink);
      expect(category).toHaveTextContent(drink.strAlcoholic);

      const maxRecommendations = 6;
      expect(recommendations).toHaveLength(maxRecommendations);

      const maxIngredients = 20;
      for (let i = 1; i <= maxIngredients; i += 1) {
        if (drink[`strIngredient${i}`]) {
          const ingredient = screen
            .getByTestId(`${i - 1}-ingredient-name-and-measure`);
          expect(ingredient).toBeInTheDocument();
          expect(ingredient)
            .toHaveTextContent(
              `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`,
            );
        }
      }
    });
});
