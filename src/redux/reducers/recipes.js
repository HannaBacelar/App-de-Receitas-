const INITIAL_STATE = {
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes')) || [],
};

const savedRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case 'SET_FOOD_RECIPES':
  //   return { ...state, recipes: action.recipes };
  case 'SET_FAVORITE':
    return { ...state, favoriteRecipes: [...state.favoriteRecipes, action.payload] };
  case 'REMOVE_FAVORITE':
    return {
      ...state,
      favoriteRecipes: [...action.payload],
    };
  default:
    return state;
  }
};

export default savedRecipes;
