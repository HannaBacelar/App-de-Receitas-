import PropTypes from 'prop-types';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPageFilters from '../components/MainPageFilters';
import { fetchRecipes } from '../redux/actions';

function Foods({ history }) {
  const foods = useSelector((state) => state.foods.recipes.meals);
  const ingredient = useSelector((state) => state.foods);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!foods) return;
    const firstMealId = foods[0].idMeal;
    if (foods.length === 1) history.push(`/foods/${firstMealId}`);
  }, [foods, history]);

  useEffect(() => {
    if (ingredient.searchByIngredient === true) {
      dispatch(fetchRecipes('ingredient', ingredient.selectedIngredient, 'Foods'));
    } else {
      dispatch(fetchRecipes('any', '', 'Foods'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Foods"
      />
      <MainPageFilters pageTitle="Foods" />
      {
        foods && foods.map((meal, index) => {
          const max = 11;
          if (index > max) return null;
          return (<Card
            key={ meal.strMeal }
            img={ meal.strMealThumb }
            index={ index }
            title={ meal.strMeal }
            id={ meal.idMeal }
            type="foods"
          />);
        })
      }
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
