import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';
import ExploreFoods from '../pages/ExploreFoods';
import fetchMock from '../../cypress/mocks/fetch';

describe('Verifica a Pagina de Explorar por Comidas', () => {
  it('Verifica se os 3 botoes da pagina esta presentes', () => {
    renderWithRouterAndStore(<ExploreFoods />);
    const buttonNames = ['By Ingredient', 'By Nationality', 'Surprise me!'];

    const buttons = screen.getAllByTestId(/explore/);
    buttons.pop();

    buttons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(buttonNames[index]);
    });
  });

  it('Verifica se ao clicar nos botoes o usuario e redirecioando',
    async () => {
      await act(async () => {
        global.fetch = await jest.fn(fetchMock);

        const { history } = renderWithRouterAndStore(<ExploreFoods />);

        const buttonIngredient = screen.getByTestId('explore-by-ingredient');
        const buttonNationality = screen.getByTestId('explore-by-nationality');
        const buttonSurpriseMe = screen.getByTestId('explore-surprise');

        userEvent.click(buttonIngredient);

        expect(history.location.pathname).toBe('/explore/foods/ingredients');

        userEvent.click(buttonNationality);

        expect(history.location.pathname).toBe('/explore/foods/nationalities');

        userEvent.click(buttonSurpriseMe);

        expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
      });
    });
});
