import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderFavorites from '../test-helpers/renderFavorites';

const favoritesMock = {
  savedRecipes: {
    doneRecipes: [],
    favoriteRecipes: [
      {
        id: '52977',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ],
    inProgressRecipes: {},
  },
};

describe('Teste Pagina de Receitas Favoritas', () => {
  it('Verifica se a pagina renderiza os botoes de filtro', () => {
    renderFavorites();

    const names = ['All', 'Foods', 'Drinks'];
    const buttons = screen.getAllByTestId(/filter-by-/);

    buttons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(names[index]);
    });
  });

  it('Verifica se a pagina renderiza os botoes de filtro', async () => {
    renderFavorites(favoritesMock);

    const lengths = [2, 1, 1];
    const buttons = screen.getAllByTestId(/filter-by-/);

    buttons.forEach((button, index) => {
      userEvent.click(button);
      const cards = screen.getAllByTestId(/horizontal-image/);
      expect(cards.length).toBe(lengths[index]);
    });
  });
});
