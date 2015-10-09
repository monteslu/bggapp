import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import hotness from '../reducers/hotness';
import picker from '../reducers/picker';
import mygames from '../reducers/mygames';
import webgames from '../reducers/webgames';

const reducer = combineReducers({
    hotness,
    picker,
    mygames,
    webgames
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

function configureStore(initialState) {
  const storeCreator = createStoreWithMiddleware(reducer, initialState);

  return storeCreator;
}


export default configureStore(); //TODO research why maybe should be a singleton.
