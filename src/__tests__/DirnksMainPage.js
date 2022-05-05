import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';
import Drinks from '../pages/Drinks';
import fetchMock from '../../cypress/mocks/fetch';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';

const allFilterUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const maxCategories = 5;
const categories = drinkCategories.drinks.map((cat) => cat.strCategory)
  .slice(0, maxCategories)
  .concat('All');

const checkCards = (recipes) => {
  const maxCards = 12;
  recipes.slice(0, maxCards).forEach((recipe, index) => {
    const card = screen.getByTestId(`${index}-recipe-card`);
    const img = screen.getByTestId(`${index}-card-img`);
    const name = screen.getByTestId(`${index}-card-name`);

    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent(recipe.strDrink);

    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', recipe.strDrinkThumb);

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(recipe.strDrink);
  });
};

const filterButtonTest = (category, firstCardName) => {
  const firstCard = screen.getByTestId('0-card-name');

  expect(firstCard).toHaveTextContent(firstCardName);
  if (category === 'onlyFirstCard') return;
  if (category === null) {
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    return;
  }
  expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
};

beforeEach(() => {
  global.fetch = jest.fn(fetchMock);
});

describe('Pagina Principal de Bebidas - Requisicoes', () => {
  it('Verifica se ao entrar na pagina os endpoints corretos sao chamados', async () => {
    await act(async () => { renderWithRouterAndStore(<Drinks />); });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });

  it('Verifica se todos os cards estao presentes e com as infos corretas',
    async () => {
      await act(async () => { renderWithRouterAndStore(<Drinks />); });

      const firstElement = screen.getByTestId('0-card-name');

      expect(firstElement).toHaveTextContent(drinks.drinks[0].strDrink);

      checkCards(drinks.drinks);
    });

  it('Verifica se todos os botoes de filtros estao presentes',
    async () => {
      await act(async () => { renderWithRouterAndStore(<Drinks />); });

      categories.forEach((cat) => {
        const categorieBtn = screen.getByTestId(`${cat}-category-filter`);

        expect(categorieBtn).toBeInTheDocument();
        expect(categorieBtn).toHaveTextContent(cat);
      });
    });

  it('Verifica se ao clicar no botao de filtro o conteudo da pagina muda',
    async () => {
      await act(async () => {
        renderWithRouterAndStore(<Drinks />);

        const categoryBtns = await screen.findAllByTestId(/-category-filter/);

        categoryBtns.forEach(async (category) => {
          userEvent.click(category);

          if (category.name === 'All') {
            expect(fetch).toHaveBeenCalledWith(allFilterUrl);
            return;
          }

          expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.name}`);
        });
      });
    });

  it('Verifica se ao clicar novamente no mesmo filtro o conteudo e resetado',
    async () => {
      await act(async () => { renderWithRouterAndStore(<Drinks />); });

      const categoryBtns = screen.getAllByTestId(/-category-filter/);

      await act(async () => userEvent.click(categoryBtns[1]));

      filterButtonTest('Ordinary Drink', '3-Mile Long Island Iced Tea');

      await act(async () => userEvent.click(categoryBtns[1]));

      filterButtonTest('onlyFirstCard', 'GG');
    });

  it('Verifica se ao clicar no card da receita o usuario e redirecionado',
    async () => {
      await act(async () => {
        const { history } = renderWithRouterAndStore(<Drinks />);

        const cards = await screen.findAllByTestId(/card-name/);

        cards.forEach((card, index) => {
          userEvent.click(card);

          const id = drinks.drinks[index].idDrink;
          expect(history.location.pathname).toBe(`/drinks/${id}`);
        });
      });
    });
});
