import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

const doneRecipesMock = {
  savedRecipes: {
    doneRecipes: [
      {
        id: '52977',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: '01/05/2022',
        tags: ['Soup'],
      },
      {
        id: '52978',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Kumpir',
        image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
        doneDate: '02/05/2022',
        tags: ['SideDish'],
      },
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        doneDate: '03/05/2022',
        tags: [],
      },
      {
        id: '17222',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'A1',
        image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        doneDate: '04/05/2022',
        tags: [],
      },
    ],
  },
};

const getFilterBtns = () => {
  const filterAllBtn = screen.getByTestId('filter-by-all-btn');
  const filterFoodsBtn = screen.getByTestId('filter-by-food-btn');
  const filterDrinksBtn = screen.getByTestId('filter-by-drink-btn');

  return { filterAllBtn, filterFoodsBtn, filterDrinksBtn };
};

describe('Página de Receitas Feitas - Header e Botões', () => {
  test('Verifica as informações do Header e a presença dos botões de filtro',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />);
      const title = screen.getByRole('heading', { level: 1 });
      const profileBtn = screen.queryByTestId('profile-top-btn');
      const searchBtn = screen.queryByTestId('search-top-btn');
      const { filterAllBtn, filterFoodsBtn, filterDrinksBtn } = getFilterBtns();

      expect(title).toHaveTextContent(/done recipes/i);
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(filterAllBtn).toBeInTheDocument();
      expect(filterFoodsBtn).toBeInTheDocument();
      expect(filterDrinksBtn).toBeInTheDocument();
    });
});

describe('Página de Receitas Feitas - Nada a renderizar', () => {
  test('Verifica se nenhum card aparece quando não há nada a mostrar', async () => {
    renderWithRouterAndStore(<DoneRecipes />);
    const cardTitle = screen.queryByTestId(/horizontal-name/);
    expect(cardTitle).not.toBeInTheDocument();
  });
});

describe('Página de Receitas Feitas - Renderização', () => {
  test('Verifica se todos os card são renderizados quando há receitas feitas',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />,
        { initialState: doneRecipesMock });
      const cardImage = screen.queryAllByTestId(/horizontal-image/);
      const cardTitle = screen.queryAllByTestId(/horizontal-name/);
      const cardCategory = screen.queryAllByTestId(/horizontal-top-text/);
      const cardDoneDate = screen.queryAllByTestId(/horizontal-done-date/);
      const cardTag = screen.queryAllByTestId(/horizontal-tag/);
      const cardShareBtn = screen.queryAllByTestId(/horizontal-share-btn/);

      const cardsInStore = 4;
      const foodCardsInStore = 2;
      expect(cardImage).toHaveLength(cardsInStore);
      expect(cardTitle).toHaveLength(cardsInStore);
      expect(cardCategory).toHaveLength(cardsInStore);
      expect(cardDoneDate).toHaveLength(cardsInStore);
      expect(cardTag).toHaveLength(foodCardsInStore);
      expect(cardShareBtn).toHaveLength(cardsInStore);
    });

  test('Verifica se todos as informações dos cards estão corretas',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />,
        { initialState: doneRecipesMock });
      const cardImage = screen.queryAllByTestId(/horizontal-image/);
      const cardTitle = screen.queryAllByTestId(/horizontal-name/);
      const cardCategory = screen.queryAllByTestId(/horizontal-top-text/);
      const cardDoneDate = screen.queryAllByTestId(/horizontal-done-date/);
      const cardTag = screen.queryAllByTestId(/horizontal-tag/);

      const cardsInStore = 4;
      const { doneRecipes } = doneRecipesMock.savedRecipes;

      for (let i = 0; i < cardsInStore; i += 1) {
        let categoryText = doneRecipes[i].alcoholicOrNot;
        if (doneRecipes[i].nationality) {
          categoryText = `${doneRecipes[i].nationality} - ${doneRecipes[i].category}`;
        }
        expect(cardImage[i].src).toBe(doneRecipes[i].image);
        expect(cardTitle[i]).toHaveTextContent(doneRecipes[i].name);
        expect(cardCategory[i]).toHaveTextContent(categoryText);
        expect(cardDoneDate[i]).toHaveTextContent(doneRecipes[i].doneDate);
      }
      expect(cardTag[0]).toHaveTextContent(doneRecipes[0].tags[0]);
      expect(cardTag[1]).toHaveTextContent(doneRecipes[1].tags[0]);
    });

  test('Verifica o botão Foods',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />,
        { initialState: doneRecipesMock });
      const foodCardsInStore = 2;

      const { filterFoodsBtn } = getFilterBtns();
      userEvent.click(filterFoodsBtn);
      const cardTitle = screen.queryAllByTestId(/horizontal-name/);

      expect(cardTitle).toHaveLength(foodCardsInStore);

      const { doneRecipes } = doneRecipesMock.savedRecipes;
      const foodCards = [doneRecipes[0], doneRecipes[1]];

      expect(cardTitle[0]).toHaveTextContent(foodCards[0].name);
      expect(cardTitle[1]).toHaveTextContent(foodCards[1].name);
    });

  test('Verifica o botão Drinks',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />,
        { initialState: doneRecipesMock });
      const drinkCardsInStore = 2;

      const { filterDrinksBtn } = getFilterBtns();
      userEvent.click(filterDrinksBtn);
      const cardTitle = screen.queryAllByTestId(/horizontal-name/);

      expect(cardTitle).toHaveLength(drinkCardsInStore);

      const { doneRecipes } = doneRecipesMock.savedRecipes;
      const drinkCards = [doneRecipes[2], doneRecipes[3]];

      expect(cardTitle[0]).toHaveTextContent(drinkCards[0].name);
      expect(cardTitle[1]).toHaveTextContent(drinkCards[1].name);
    });

  test('Verifica o botão All',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />,
        { initialState: doneRecipesMock });
      const cardsInStore = 4;

      const { filterAllBtn, filterFoodsBtn, filterDrinksBtn } = getFilterBtns();

      userEvent.click(filterFoodsBtn);
      userEvent.click(filterDrinksBtn);
      userEvent.click(filterAllBtn);

      const cardTitle = screen.queryAllByTestId(/horizontal-name/);

      expect(cardTitle).toHaveLength(cardsInStore);

      const { doneRecipes } = doneRecipesMock.savedRecipes;
      const foodCards = [doneRecipes[0], doneRecipes[1]];
      const drinkCards = [doneRecipes[2], doneRecipes[3]];

      expect(cardTitle[0]).toHaveTextContent(foodCards[0].name);
      expect(cardTitle[1]).toHaveTextContent(foodCards[1].name);
      expect(cardTitle[2]).toHaveTextContent(drinkCards[0].name);
      expect(cardTitle[3]).toHaveTextContent(drinkCards[1].name);
    });
});
