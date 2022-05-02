import fetchDrinks from '../../services/drinksApi';
import fetchFoods from '../../services/foodsApi';

export const setFoodRecipes = (recipes) => ({ type: 'SET_FOOD_RECIPES', recipes });

export const setDrinksRecipes = (recipes) => ({ type: 'SET_DRINK_RECIPES', recipes });

export function fetchRecipes(type, value, page) {
  const displayAlert = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  return async (dispatch) => {
    if (page !== 'Foods') {
      const recipes = await fetchDrinks(type, value);
      if (recipes.drinks === null) displayAlert();
      dispatch(setDrinksRecipes(recipes));
      return;
    }
    const recipes = await fetchFoods(type, value);
    if (recipes.meals === null) displayAlert();
    dispatch(setFoodRecipes(recipes));
  };
}

export const setFavoriteRecipe = (payload) => ({ type: 'SET_FAVORITE', payload });

export const removeFavoriteRecipe = (payload) => ({
  type: 'REMOVE_FAVORITE',
  payload,
});

export const saveProgress = (type, id, ingredientsList) => ({
  type: 'SAVE_PROGRESS',
  payload: { type, id, ingredientsList },
});
