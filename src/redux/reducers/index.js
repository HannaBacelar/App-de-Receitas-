import { combineReducers } from 'redux';
import foods from './foods';
import drinks from './drinks';

const rootReducer = combineReducers({ foods, drinks });

export default rootReducer;
