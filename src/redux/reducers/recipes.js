const INITIAL_STATE = {
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes')) || [],
};

const savedRecipes = (state = INITIAL_STATE, action) => {
  let updatedProgress;
  let updatedDoneRecipes;
  switch (action.type) {
  case 'SET_FAVORITE':
    return { ...state, favoriteRecipes: [...state.favoriteRecipes, action.payload] };
  case 'REMOVE_FAVORITE':
    return {
      ...state,
      favoriteRecipes: [...action.payload],
    };
  case 'SAVE_PROGRESS':
    updatedProgress = {
      cocktails: action.payload.type === 'Drink'
        ? { ...state.inProgressRecipes.cocktails,
          [action.payload.id]: action.payload.ingredientsList }
        : { ...state.inProgressRecipes.cocktails },
      meals: action.payload.type === 'Meal'
        ? { ...state.inProgressRecipes.meals,
          [action.payload.id]: action.payload.ingredientsList }
        : { ...state.inProgressRecipes.meals },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedProgress));
    return {
      ...state,
      inProgressRecipes: updatedProgress,
    };
  case 'SET_RECIPE_DONE':
    updatedDoneRecipes = state.doneRecipes.some((item) => item.id === action.payload.id)
      ? state.doneRecipes
      : [...state.doneRecipes, action.payload];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
    return {
      ...state,
      doneRecipes: updatedDoneRecipes,
    };
  default:
    return state;
  }
};

export default savedRecipes;
