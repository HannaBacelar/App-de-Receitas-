const INITIAL_STATE = {
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
};

const preferences = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_DARK_MODE':
    localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
    return { ...state, darkMode: !state.darkMode };
  default:
    return state;
  }
};

export default preferences;
