const INITIAL_STATE = {
  recipes: [],
  searchByIngredient: false,
  selectedIngredient: '',
};

const foods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_FOOD_RECIPES':
    return { ...state, recipes: action.recipes };
  default:
    return state;
  }
};

export default foods;
