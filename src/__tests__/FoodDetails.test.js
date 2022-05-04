import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetchMock from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';
import myStore from '../redux/store';
import getElements from '../test-helpers/getElements';
import mockClipboard from '../test-helpers/mocks';
import renderDetails from '../test-helpers/renderDetails';

const meal = oneMeal.meals[0];

const foodState = { savedRecipes: {
  favoriteRecipes: [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }],
  doneRecipes: [],
  inProgressRecipes: {},
} };

const foodProgressState = { savedRecipes: {
  favoriteRecipes: [],
  doneRecipes: [],
  inProgressRecipes: {
    cocktails: {},
    meals: {
      52771: [1, 2],
    },
  },
} };

const foodDoneState = { savedRecipes: {
  favoriteRecipes: [],
  doneRecipes: [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '02/04/2022',
      tags: ['Pasta', 'Curry'],
    },
  ],
  inProgressRecipes: {},
} };

beforeEach(() => {
  global.fetch = jest.spyOn(global, 'fetch')
    .mockImplementation(fetchMock);
});

describe('Página de Detalhes - Requisições', () => {
  test('Testa se as duas requisições foram feitas corretamente para comida', async () => {
    await act(async () => renderDetails('food', null, myStore));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});

describe('Página de Detalhes - Elementos', () => {
  test('Verifica se todos os elementos estão presentes e corretos na tela de comida',
    async () => {
      await act(async () => renderDetails('food'));

      const { photo, title, category,
        shareBtn, favoriteBtn,
        recommendations, video } = await getElements('food');

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
});

describe('Página de Detalhes - Botão de Favoritar', () => {
  test('Verifica a ação de favoritar comida',
    async () => {
      const { store } = renderDetails('food');
      const { favoriteBtn } = await getElements('food');

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual([]);

      userEvent.click(favoriteBtn);

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual(foodState.savedRecipes.favoriteRecipes);
    });

  test('Verifica a ação de desfavoritar comida',
    async () => {
      const { store } = renderDetails('food', foodState);
      const { favoriteBtn } = await getElements('food');

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual(foodState.savedRecipes.favoriteRecipes);

      userEvent.click(favoriteBtn);

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual([]);
    });
});

describe('Página de Detalhes - Compartilhar', () => {
  test('Verifica a ação do botão compartilhar link na tela de comida', async () => {
    global.navigator.clipboard = mockClipboard;
    await act(async () => renderDetails('food'));

    const { shareBtn } = await getElements('food');
    const toast = await screen.findByText('Link copied!');

    expect(toast).toBeInTheDocument();
    expect(toast.parentElement.className).not.toContain('visible');

    userEvent.click(shareBtn);

    expect(global.navigator.clipboard.writeText)
      .toHaveBeenCalledWith(window.location.href);

    expect(toast).toBeInTheDocument();
    expect(toast.parentElement.className).toContain('visible');

    const afterOneSecond = 1000;
    setTimeout(() => {
      expect(toast.parentElement.className).not.toContain('visible');
    }, afterOneSecond);
  });
});

describe('Página de Detalhes - Start Recipe', () => {
  test('Verifica a ação do botão de iniciar receita na tela de comida',
    async () => {
      await act(async () => renderDetails('food'));
      const { startRecipeBtn } = await getElements('food');

      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn).toHaveTextContent(/start recipe/i);

      userEvent.click(startRecipeBtn);
      expect(startRecipeBtn).not.toBeInTheDocument();
    });

  test('Verifica a ação do botão de continuar receita na tela de comida',
    async () => {
      await act(async () => renderDetails('food', foodProgressState));
      const { startRecipeBtn } = await getElements('food');

      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn).toHaveTextContent(/continue recipe/i);

      userEvent.click(startRecipeBtn);
      expect(startRecipeBtn).not.toBeInTheDocument();
    });

  test('Verifica se o botão não existe em receitas feitas na tela de comida',
    async () => {
      await act(async () => renderDetails('food', foodDoneState));

      const startRecipeBtn = screen.queryByTestId('start-recipe-btn');

      expect(startRecipeBtn).not.toBeInTheDocument();
    });
});
