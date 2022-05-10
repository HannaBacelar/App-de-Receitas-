import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPageFilters from '../components/MainPageFilters';
import { fetchRecipes } from '../redux/actions';
import '../styles/FoodsDrinks.css';

function Drinks() {
  const drinks = useSelector((state) => state.drinks.recipes.drinks);
  const ingredient = useSelector((state) => state.drinks);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!drinks) return;
    const firstDrinkId = drinks[0].idDrink;
    if (drinks.length === 1) history.push(`/drinks/${firstDrinkId}`);
  }, [drinks, history]);

  useEffect(() => {
    if (ingredient.searchByIngredient === true) {
      dispatch(fetchRecipes('ingredient', ingredient.selectedIngredient, 'Drinks'));
    } else {
      dispatch(fetchRecipes('any', '', 'Drinks'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            id={ drink.idDrink }
            type="drinks"
          />);
        })
      }
      <Footer />
    </div>
  );
}

export default Drinks;
