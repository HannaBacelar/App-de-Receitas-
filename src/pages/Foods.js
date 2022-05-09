import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/FoodsDrinks.css';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainPageFilters from '../components/MainPageFilters';
import { fetchRecipes } from '../redux/actions';

function Foods() {
  const foods = useSelector((state) => state.foods.recipes.meals);
  const ingredient = useSelector((state) => state.foods);
  const redirectStatus = useSelector((state) => state.foods.redirectStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!foods) return;
    const firstMealId = foods[0].idMeal;
    if (foods.length === 1 && redirectStatus) history.push(`/foods/${firstMealId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="recipes-cards-container">
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
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
