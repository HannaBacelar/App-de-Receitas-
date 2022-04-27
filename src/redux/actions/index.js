import fetchDrinks from '../../services/drinksApi';
import fetchFoods from '../../services/foodsApi';

export const setFoodRecipes = (recipes) => ({ type: 'SET_FOOD_RECIPES', recipes });

export const setDrinksRecipes = (recipes) => ({ type: 'SET_DRINK_RECIPES', recipes });

export function fetchItemsRecipes(type, value, page) {
  return async (dispatch) => {
    if (page !== 'Foods') {
      const recipes = await fetchDrinks(type, value);
      dispatch(setDrinksRecipes(recipes));
      return;
    }
    const recipes = await fetchFoods(type, value);
    dispatch(setFoodRecipes(recipes));
  };
}
