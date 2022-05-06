import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('Página Não Encontrada', () => {
  test('Verifica se o componente NotFound é renderizado numa url inválida', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/page-claudio');
    const notFoundTitle = screen.getByText(/not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
