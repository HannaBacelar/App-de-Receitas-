import { combineReducers } from 'redux';
import drinks from './drinks';
import nationality from './nationality';
import recipesNationality from './recipesNationality';
import foods from './foods';
import savedRecipes from './recipes';

const rootReducer = combineReducers({
  foods, drinks, nationality, recipesNationality, savedRecipes });

export default rootReducer;
