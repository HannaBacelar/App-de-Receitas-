import fetchDrinks from '../../services/drinksApi';
import fetchFoods from '../../services/foodsApi';
import nationalityApi from '../../services/nationalityApi';
import recipesNationalityApi from '../../services/recipesNationalityApi';

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

export const setNationality = (nationality) => ({
  type: 'SET_NATIONALITY', nationality: nationality.meals });
export const ERROR = (error) => ({ type: 'ERROR', error });

export function fetchAPINationality(list) {
  return async (dispatch) => {
    try {
      const response = await nationalityApi(list);
      dispatch(setNationality(response));
    } catch (error) {
      return error;
    }
  };
}

export const recipesNationality = (recipes) => ({
  type: 'SET_NATIONALITY_RECIPES', recipes: recipes.meals });
export const ERROR_NATIONALITY = (error) => ({ type: 'ERROR', error });

export function fetchApiNationalityRecipes(country) {
  return async (dispatch) => {
    try {
      const response = await recipesNationalityApi(country);
      dispatch(recipesNationality(response));
    } catch (error) {
      return error;
    }
  };
}
