import { combineReducers } from 'redux';
import {
  SELECT_HOTNESS, INVALIDATE_HOTNESS,
  REQUEST_GAMES, RECEIVE_GAMES
} from '../actions';

function selectedHotness(state = 'boardgames', action) {
  switch (action.type) {
  case SELECT_HOTNESS:
    return action.hotness;
  default:
    return state;
  }
}

function games(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_HOTNESS:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_GAMES:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_GAMES:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.games,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

function gamesByHotness(state = { }, action) {
  console.log('gamesByHotness', state);

  switch (action.type) {
  case INVALIDATE_HOTNESS:
  case RECEIVE_GAMES:
  case REQUEST_GAMES:
    return Object.assign({}, state, {
      [action.hotness]: games(state[action.hotness], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  gamesByHotness,
  selectedHotness
});

export default rootReducer;
