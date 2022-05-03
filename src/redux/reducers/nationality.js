const INITIAL_STATE = {
  nationality: ['American'],
  error: '',
};

const nationality = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_NATIONALITY':
    return { ...state, nationality: action.nationality };
  case 'ERROR':
    return { ...state, error: action.ERROR };
  default:
    return state;
  }
};

export default nationality;
