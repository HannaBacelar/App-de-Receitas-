import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetchMock from '../../cypress/mocks/fetch';
import oneDrink from '../../cypress/mocks/oneDrink';
import myStore from '../redux/store';
import getElements from '../test-helpers/getElements';
import mockClipboard from '../test-helpers/mocks';
import renderDetails from '../test-helpers/renderDetails';

const drink = oneDrink.drinks[0];

const drinkState = { savedRecipes: {
  favoriteRecipes: [
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }],
  doneRecipes: [],
  inProgressRecipes: {},
} };

const drinkProgressState = { savedRecipes: {
  favoriteRecipes: [],
  doneRecipes: [],
  inProgressRecipes: {
    cocktails: {
      178319: [1, 2],
    },
    meals: {},
  },
} };

const drinkDoneState = { savedRecipes: {
  favoriteRecipes: [],
  doneRecipes: [
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '02/04/2022',
      tags: [],
    },
  ],
  inProgressRecipes: {},
} };

beforeEach(() => {
  global.fetch = jest.spyOn(global, 'fetch')
    .mockImplementation(fetchMock);
});

describe('Página de Detalhes - Requisições', () => {
  test('Testa se as duas requisições foram feitas corretamente para bebida', async () => {
    await act(async () => renderDetails('drink', null, myStore));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});

describe('Página de Detalhes - Elementos', () => {
  test('Verifica se todos os elementos estão presentes e corretos na tela de bebida',
    async () => {
      await act(async () => renderDetails('drink'));

      const { photo, title, category,
        shareBtn, favoriteBtn,
        recommendations } = await getElements('drink');

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

describe('Página de Detalhes - Botão de Favoritar', () => {
  test('Verifica a ação de favoritar bebida',
    async () => {
      const { store } = renderDetails('drink');
      const { favoriteBtn } = await getElements('drink');

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual([]);

      userEvent.click(favoriteBtn);

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual(drinkState.savedRecipes.favoriteRecipes);
    });

  test('Verifica a ação de desfavoritar bebida',
    async () => {
      const { store } = renderDetails('drink', drinkState);
      const { favoriteBtn } = await getElements('drink');

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual(drinkState.savedRecipes.favoriteRecipes);

      userEvent.click(favoriteBtn);

      expect(store.getState().savedRecipes.favoriteRecipes)
        .toEqual([]);
    });
});

describe('Página de Detalhes - Compartilhar', () => {
  test('Verifica a ação do botão compartilhar link na tela de bebida', async () => {
    global.navigator.clipboard = mockClipboard;
    await act(async () => renderDetails('drink'));

    const { shareBtn } = await getElements('drink');
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
  test('Verifica a ação do botão de iniciar receita na tela de bebida',
    async () => {
      await act(async () => renderDetails('drink'));
      const { startRecipeBtn } = await getElements('drink');

      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn).toHaveTextContent(/start recipe/i);

      userEvent.click(startRecipeBtn);
      expect(startRecipeBtn).not.toBeInTheDocument();
    });

  test('Verifica a ação do botão de continuar receita na tela de bebida',
    async () => {
      await act(async () => renderDetails('drink', drinkProgressState));
      const { startRecipeBtn } = await getElements('drink');

      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn).toHaveTextContent(/continue recipe/i);

      userEvent.click(startRecipeBtn);
      expect(startRecipeBtn).not.toBeInTheDocument();
    });

  test('Verifica se o botão não existe em receitas feitas na tela de bebida',
    async () => {
      await act(async () => renderDetails('drink', drinkDoneState));

      const startRecipeBtn = screen.queryByTestId('start-recipe-btn');

      expect(startRecipeBtn).not.toBeInTheDocument();
    });
});
