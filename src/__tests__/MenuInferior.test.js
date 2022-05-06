import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('Teste o componente footer', () => {
  it('O menu inferior deve ter possuir o atributo data-testid="footer', () => {
    renderWithRouterAndStore(<Footer />);
    const footerTestid = screen.getByTestId(/footer/i);
    expect(footerTestid).toBeInTheDocument();
  });
  // Elemento que leva para a..
  it('...pag de bebidas deve possuir o atributo "drinks-bottom-btn', () => {
    renderWithRouterAndStore(<Footer />);
    const drinksTestid = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinksTestid).toBeInTheDocument();
  });
  // O elemento que leva para a página...
  it('de comidas deve possuir o atributo "food-bottom-btn"', () => {
    renderWithRouterAndStore(<Footer />);
    const foodsTestid = screen.getByTestId(/food-bottom-btn/i);
    expect(foodsTestid).toBeInTheDocument();
  });
  // O elemento que leva para...
  it('...a página de explorar deve possuir o atributo "explore-bottom-btn";', () => {
    renderWithRouterAndStore(<Footer />);
    const exploreTestid = screen.getByTestId(/explore-bottom-btn/i);
    expect(exploreTestid).toBeInTheDocument();
  });
});
