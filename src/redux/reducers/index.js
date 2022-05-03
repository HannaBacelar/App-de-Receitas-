import { combineReducers } from 'redux';
import foods from './foods';
import drinks from './drinks';
import nationality from './nationality';
import recipesNationality from './recipesNationality';

const rootReducer = combineReducers({ foods, drinks, nationality, recipesNationality });

export default rootReducer;
