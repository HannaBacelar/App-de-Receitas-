const INITIAL_STATE = {
  recipes: [],
};

const foods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_RECIPES':
    return { ...state, recipes: action.recipes };
  default:
    return state;
  }
};

export default foods;
