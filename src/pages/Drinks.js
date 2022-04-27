import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Card from '../components/Card';
import { fetchItemsRecipes } from '../redux/actions';
import MainPageFilters from '../components/MainPageFilters';

function Drinks({ history }) {
  const drinks = useSelector((state) => state.drinks.recipes.drinks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!drinks) return;
    const firstDrinkId = drinks[0].idDrink;
    if (drinks.length === 1) history.push(`/drinks/${firstDrinkId}`);
  }, [drinks, history]);

  useEffect(() => {
    dispatch(fetchItemsRecipes('any', '', 'Drinks'));
  }, [dispatch]);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Drinks"
      />
      <MainPageFilters pageTitle="Drinks" />
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
