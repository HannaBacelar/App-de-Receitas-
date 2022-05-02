const INITIAL_STATE = {
  recipes: [],
  searchByIngredient: false,
  selectedIngredient: '',
};

const drinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_DRINK_RECIPES':
    return { ...state, recipes: action.recipes };
  default:
    return state;
  }
};

export default drinks;
