import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetchMock from '../../cypress/mocks/fetch';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import getElements from '../test-helpers/getElements';
// import mockClipboard from '../test-helpers/mocks';
import renderInProgress from '../test-helpers/renderInProgress';

const meal = oneMeal.meals[0];

const drink = oneDrink.drinks[0];

const mockedFoodIngredientsNumber = 8;
const totalFoodIngredientsMock = [];
for (let i = 1; i <= mockedFoodIngredientsNumber; i += 1) {
  totalFoodIngredientsMock.push(i);
}

const mockedDrinkIngredientsNumber = 3;
const totalDrinkIngredientsMock = [];
for (let i = 1; i <= mockedDrinkIngredientsNumber; i += 1) {
  totalDrinkIngredientsMock.push(i);
}

const foodProgressState = { savedRecipes: {
  favoriteRecipes: [],
  doneRecipes: [],
  inProgressRecipes: {
    cocktails: {},
    meals: {
      52771: totalFoodIngredientsMock,
    },
  },
} };

const drinkProgressState = { savedRecipes: {
  favoriteRecipes: [],
  doneRecipes: [],
  inProgressRecipes: {
    cocktails: {
      178319: totalDrinkIngredientsMock,
    },
    meals: {},
  },
} };

beforeEach(() => {
  global.fetch = jest.spyOn(global, 'fetch')
    .mockImplementation(fetchMock);
});

describe('Página de Progresso - Requisições', () => {
  test('Testa se a requisição à API foi feita corretamente para comida', async () => {
    await act(async () => renderInProgress('food'));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  });
});

describe('Página de Progresso - Elementos - Comida', () => {
  test('Verifica se todos os elementos estão presentes'
  + 'e corretos na tela de comida em progresso',
  async () => {
    renderInProgress('food');

    const { photo, title, category,
      shareBtn, favoriteBtn,
      finishRecipeBtn } = await getElements('food', 'inProgress');

    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();

    expect(photo.src).toBe(meal.strMealThumb);
    expect(title).toHaveTextContent(meal.strMeal);
    expect(category).toHaveTextContent(meal.strCategory);
    expect(finishRecipeBtn).toHaveTextContent(/finish recipe/i);

    const maxIngredients = 20;
    for (let i = 1; i <= maxIngredients; i += 1) {
      if (meal[`strIngredient${i}`]) {
        const ingredient = screen
          .getByTestId(`${i - 1}-ingredient-step`);
        expect(ingredient).toBeInTheDocument();
        expect(ingredient)
          .toHaveTextContent(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
          );
      }
    }
  });
});

describe('Página de Progresso - Elementos - Bebida', () => {
  test('Verifica se todos os elementos estão presentes'
  + 'e corretos na tela de bebida em progresso',
  async () => {
    renderInProgress('drink');

    const { photo, title, category,
      shareBtn, favoriteBtn,
      finishRecipeBtn } = await getElements('drink', 'inProgress');

    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();

    expect(photo.src).toBe(drink.strDrinkThumb);
    expect(title).toHaveTextContent(drink.strDrink);
    expect(category).toHaveTextContent(drink.strAlcoholic);
    expect(finishRecipeBtn).toHaveTextContent(/finish recipe/i);

    const maxIngredients = 20;
    for (let i = 1; i <= maxIngredients; i += 1) {
      if (drink[`strIngredient${i}`]) {
        const ingredient = screen
          .getByTestId(`${i - 1}-ingredient-step`);
        expect(ingredient).toBeInTheDocument();
        expect(ingredient)
          .toHaveTextContent(
            `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`,
          );
      }
    }
  });
});

describe('Página de Detalhes - Checkboxes', () => {
  test('Verifica se é possível marcar e desmarcar todas as checkboxes', async () => {
    renderInProgress('food');
    const checkboxLabels = await screen.findAllByTestId(/-ingredient-step/);
    checkboxLabels.forEach((label) => {
      expect(label.firstChild).not.toBeChecked();
    });
    checkboxLabels.forEach((label) => label.click());
    checkboxLabels.forEach((label) => {
      expect(label.firstChild).toBeChecked();
    });
    checkboxLabels.forEach((label) => label.click());
    checkboxLabels.forEach((label) => {
      expect(label.firstChild).not.toBeChecked();
    });
  });

  test('Verifica se as checkboxes são recebidas pela store para comidas'
   + ' e se é atualizada ao clicar',
  async () => {
    const { store } = renderInProgress('food', foodProgressState);
    const checkboxLabels = await screen.findAllByTestId(/-ingredient-step/);
    checkboxLabels.forEach((label) => {
      expect(label.firstChild).toBeChecked();
    });
    checkboxLabels[2].click();
    expect(checkboxLabels[2]).not.toBeChecked();
    const savedState = store.getState()
      .savedRecipes.inProgressRecipes.meals[52771];

    // 2 + 1 equivale ao número ingrediente na posição 2, visto que a array começa com 1, enquanto o índice inicia em 0
    expect(savedState).not.toContain(2 + 1);
  });

  test('Verifica se as checkboxes são recebidas pela store para bebidas'
  + ' e se é atualizada ao clicar',
  async () => {
    const { store } = renderInProgress('drink', drinkProgressState);
    const checkboxLabels = await screen.findAllByTestId(/-ingredient-step/);
    checkboxLabels.forEach((label) => {
      expect(label.firstChild).toBeChecked();
    });
    checkboxLabels[2].click();
    expect(checkboxLabels[2]).not.toBeChecked();
    const savedState = store.getState()
      .savedRecipes.inProgressRecipes.cocktails[178319];

    // 2 + 1 equivale ao número ingrediente na posição 2, visto que a array começa com 1, enquanto o índice inicia em 0
    expect(savedState).not.toContain(2 + 1);
  });
});

describe('Página de Detalhes - Finish Recipe', () => {
  test('Verifica a ação do botão de terminar receita na tela de comida em progresso',
    async () => {
      const { history } = renderInProgress('food', foodProgressState);
      const { finishRecipeBtn } = await getElements('food', 'inProgress');

      expect(finishRecipeBtn).toBeInTheDocument();
      expect(finishRecipeBtn).toHaveTextContent(/finish recipe/i);

      userEvent.click(finishRecipeBtn);
      expect(history.location.pathname).toBe('/done-recipes');
      expect(finishRecipeBtn).not.toBeInTheDocument();
    });
});
