import { screen } from '@testing-library/react';
import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('Página de Receitas Feitas - Header e Botões', () => {
  test('Verifica as informações do Header e a presença dos botões de filtro',
    async () => {
      renderWithRouterAndStore(<DoneRecipes />);
      const title = screen.getByRole('heading', { level: 1 });
      const profileBtn = screen.queryByTestId('profile-top-btn');
      const searchBtn = screen.queryByTestId('search-top-btn');
      const filterAllBtn = screen.getByTestId('filter-by-all-btn');
      const filterFoodsBtn = screen.getByTestId('filter-by-food-btn');
      const filterDrinksBtn = screen.getByTestId('filter-by-drink-btn');
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
