import { combineReducers } from 'redux';
import drinks from './drinks';
import foods from './foods';
import nationality from './nationality';
import preferences from './preferences';
import savedRecipes from './recipes';
import recipesNationality from './recipesNationality';

const rootReducer = combineReducers({
  foods, drinks, nationality, recipesNationality, savedRecipes, preferences });

export default rootReducer;
