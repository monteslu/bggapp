import {
  REQUEST_GAMES, RECEIVE_GAMES
} from '../actions/hotness';


function hotness(state = {
  isFetching: false,
  games: []
}, action) {
  switch (action.type) {
  case REQUEST_GAMES:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_GAMES:
    console.log('RECEIVE_GAMES:', action);
    return Object.assign({}, state, {
      isFetching: false,
      games: action.games
    });
  default:
    return state;
  }
}

export default hotness;
