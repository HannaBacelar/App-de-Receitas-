import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

function Drinks({ history }) {
  const drinks = useSelector((state) => state.drinks.recipes.drinks);

  useEffect(() => {
    if (!drinks) return;
    const firstDrinkId = drinks[0].idDrink;
    if (drinks.length === 1) history.push(`/drinks/${firstDrinkId}`);
  }, [drinks, history]);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Drinks"
      />
    </div>
  );
}
Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Drinks;
