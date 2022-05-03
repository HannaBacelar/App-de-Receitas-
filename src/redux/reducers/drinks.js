const INITIAL_STATE = {
  recipes: [],
  searchByIngredient: false,
  selectedIngredient: '',
};

const drinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_DRINK_RECIPES':
    return { ...state,
      recipes: action.recipes,
      searchByIngredient: false,
    };
  case 'SET_INGREDIENT_DRINKS':
    return { ...state,
      searchByIngredient: true,
      selectedIngredient: action.value,
    };
  default:
    return state;
  }
};

export default drinks;
