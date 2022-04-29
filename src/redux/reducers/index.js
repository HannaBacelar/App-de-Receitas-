import { combineReducers } from 'redux';
import drinks from './drinks';
import foods from './foods';
import savedRecipes from './recipes';

const rootReducer = combineReducers({ foods, drinks, savedRecipes });

export default rootReducer;
