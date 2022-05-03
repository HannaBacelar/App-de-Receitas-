const INITIAL_STATE = {
  recipes: [],
  searchByIngredient: false,
  selectedIngredient: '',
  redirectStatus: true,
};

const foods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_REDIRECT_STATUS':
    return { ...state, redirectStatus: action.payload };
  case 'SET_FOOD_RECIPES':
    return { ...state,
      recipes: action.recipes,
      searchByIngredient: false,
    };
  case 'SET_INGREDIENT_FOODS':
    return { ...state,
      searchByIngredient: true,
      selectedIngredient: action.value,
      redirectStatus: false,
    };
  default:
    return state;
  }
};

export default foods;
