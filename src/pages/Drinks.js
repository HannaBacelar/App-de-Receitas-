import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Card from '../components/Card';

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
      {
        drinks && drinks.map((drink, index) => {
          const max = 11;
          if (index > max) return;
          return (<Card
            key={ drink.strDrink }
            img={ drink.strDrinkThumb }
            index={ index }
            title={ drink.strDrink }
          />);
        })
      }
    </div>
  );
}
Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Drinks;
