import { combineReducers } from 'redux';


import hotness from './hotness';
import mygames from './mygames';
import picker from './picker';
import webgames from './webgames';

const reducers = combineReducers({
  hotness,
  mygames,
  picker,
  webgames
});

export default reducers;
