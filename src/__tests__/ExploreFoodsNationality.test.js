import React from 'react';
import { screen } from '@testing-library/react';
import fetchMock from '../../cypress/mocks/fetch';
import ExploreFoodsByNationality from '../pages/ExploreFoodsByNationality';
import renderWithRouterAndStore from '../test-helpers/renderWithRouterAndStore';

describe('Teste a pagina de explorar Nacionalidades', () => {
  it('testa se a tela tem um dropdown', () => {
    renderWithRouterAndStore(<ExploreFoodsByNationality />);
    const dropdownTeste = screen.getByTestId(/explore-by-nationality-dropdown/i);
    expect(dropdownTeste).toBeInTheDocument();
  });

  it('testa se a Api ALL renderiza ao entrar na tela', async () => {
    global.fetch = jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);
    renderWithRouterAndStore(<ExploreFoodsByNationality />);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it('testa as options', async () => {
    global.fetch = jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);
    renderWithRouterAndStore(<ExploreFoodsByNationality />);
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(2);
  });

  it('testa as options dos países', async () => {
    global.fetch = jest.spyOn(global, 'fetch')
      .mockImplementation(fetchMock);
    renderWithRouterAndStore(<ExploreFoodsByNationality />);
    const Countries = await screen.findByRole('option', { name: /American/i });
    expect(Countries).toBeInTheDocument();
    const dropdownTeste = screen.getByTestId(/explore-by-nationality-dropdown/i);
    dropdownTeste.value = 'American';
  });
});
