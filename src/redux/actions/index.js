import fetchFoods from '../../services/foodsApi';

export const setFoodRecipes = (recipes) => ({ type: 'SET_RECIPES', recipes });

export function fetchFoodRecipes(type, value) {
  return async (dispatch) => {
    const recipes = await fetchFoods(type, value);
    dispatch(setFoodRecipes(recipes));
  };
}
