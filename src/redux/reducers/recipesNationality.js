const INITIAL_STATE = {
  recipesNationality: [],
  error: '',
};

const recipesNationality = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_NATIONALITY_RECIPES':
    return { ...state, recipesNationality: action.recipes };
  case 'ERROR':
    return { ...state, error: action.ERROR };
  default:
    return state;
  }
};

export default recipesNationality;
