import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';
import Foods from '../pages/Foods';
import fetchMock from '../../cypress/mocks/fetch';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';

const allFilterUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const maxCategories = 5;
const categories = mealCategories.meals.map((cat) => cat.strCategory)
  .slice(0, maxCategories)
  .concat('All');

const checkCards = (recipes) => {
  const maxCards = 12;
  recipes.slice(0, maxCards).forEach((recipe, index) => {
    const card = screen.getByTestId(`${index}-recipe-card`);
    const img = screen.getByTestId(`${index}-card-img`);
    const name = screen.getByTestId(`${index}-card-name`);

    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent(recipe.strMeal);

    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', recipe.strMealThumb);

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(recipe.strMeal);
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
  expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
};

describe('Pagina Principal de Comidas - SearchBar', () => {
  const TOGGLE_SEARCH_BAR_ID = 'search-top-btn';
  const SEARCH_INPUT_ID = 'search-input';
  const RADIOS_BUTTONS_ID = /search-radio/;

  it('Verifica se ao clicar no elemento de search do header os filtros aparecem', () => {
    renderWithRouterAndStore(<Foods />);
    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH_BAR_ID);

    userEvent.click(toggleSearch);

    const radios = screen.getAllByTestId(RADIOS_BUTTONS_ID);
    const input = screen.getByTestId(SEARCH_INPUT_ID);
    const search = screen.getByTestId('exec-search-btn');

    expect(input).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    radios.forEach((radio) => expect(radio).toBeInTheDocument());
  });

  it('Verifica se posso escrever no input e clicar nos radios', () => {
    renderWithRouterAndStore(<Foods />);
    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH_BAR_ID);

    userEvent.click(toggleSearch);

    const radios = screen.getAllByTestId(RADIOS_BUTTONS_ID);
    const input = screen.getByTestId(SEARCH_INPUT_ID);

    userEvent.type(input, 'Chicken');

    expect(input).toHaveValue('Chicken');

    radios.forEach((radio) => {
      userEvent.click(radio);

      expect(radio).toBeChecked();
    });
  });

  it('Verifica se procurar com mais de uma letra um alert aparece', () => {
    window.alert = jest.fn();
    renderWithRouterAndStore(<Foods />);
    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH_BAR_ID);

    userEvent.click(toggleSearch);

    const input = screen.getByTestId(SEARCH_INPUT_ID);
    const radios = screen.getAllByTestId(RADIOS_BUTTONS_ID);
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'AB');
    userEvent.click(radios[2]);
    userEvent.click(searchBtn);

    expect(window.alert).toHaveBeenCalledTimes(1);

    userEvent.type(input, 'a');
    userEvent.click(searchBtn);

    expect(window.alert).not.toHaveBeenCalledTimes(2);
  });
});

describe('Pagina Principal de Comidas - Requisicoes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('Verifica se ao entrar na pagina os endpoints corretos sao chamados', async () => {
    await act(async () => { renderWithRouterAndStore(<Foods />); });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });

  it('Verifica se todos os cards estao presentes e com as infos corretas',
    async () => {
      await act(async () => { renderWithRouterAndStore(<Foods />); });

      const firstElement = screen.getByTestId('0-card-name');

      expect(firstElement).toHaveTextContent(meals.meals[0].strMeal);

      checkCards(meals.meals);
    });

  it('Verifica se todos os botoes de filtros estao presentes',
    async () => {
      await act(async () => { renderWithRouterAndStore(<Foods />); });

      categories.forEach((cat) => {
        const categorieBtn = screen.getByTestId(`${cat}-category-filter`);

        expect(categorieBtn).toBeInTheDocument();
        expect(categorieBtn).toHaveTextContent(cat);
      });
    });

  it('Verifica se ao clicar no botao de filtro o conteudo da pagina muda',
    async () => {
      await act(async () => {
        renderWithRouterAndStore(<Foods />);

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
      await act(async () => { renderWithRouterAndStore(<Foods />); });

      const categoryBtns = screen.getAllByTestId(/-category-filter/);

      await act(async () => userEvent.click(categoryBtns[1]));

      filterButtonTest('Beef', 'Beef and Mustard Pie');

      await act(async () => userEvent.click(categoryBtns[1]));

      filterButtonTest('onlyFirstCard', 'Corba');
    });

  it('Verifica se ao clicar no card da receita o usuario e redirecionado',
    async () => {
      await act(async () => {
        const { history } = renderWithRouterAndStore(<Foods />);

        const cards = await screen.findAllByTestId(/card-name/);

        cards.forEach((card, index) => {
          userEvent.click(card);

          const id = meals.meals[index].idMeal;
          expect(history.location.pathname).toBe(`/foods/${id}`);
        });
      });
    });
});
