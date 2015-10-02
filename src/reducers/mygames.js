import {
  REQUEST_MY_GAMES,
  RECEIVE_MY_GAMES,
  UPDATE_USERNAME,
  COLLECTION_QUEUED,
  ERROR_FETCHING,
} from '../actions/mygames';


function mygames(state = {
  username: localStorage.username,
  isFetching: false,
  isQueued: false,
  errorFetching: null,
  games: []
}, action) {

  switch (action.type) {
  case REQUEST_MY_GAMES:
    return Object.assign({}, state, {
      isFetching: true,
      isQueued: false,
      errorFetching: null
    });
  case RECEIVE_MY_GAMES:
    return Object.assign({}, state, {
      isFetching: false,
      games: action.games,
      isQueued: false,
      errorFetching: null
    });
  case UPDATE_USERNAME:
    return Object.assign({}, state, {
      username: action.username
    });
  case COLLECTION_QUEUED:
    return Object.assign({}, state, {
      isFetching: false,
      isQueued: true,
      errorFetching: null
    });
  case ERROR_FETCHING:
    return Object.assign({}, state, {
      isFetching: false,
      isQueued: false,
      errorFetching: action.error
    });
  default:
    return state;
  }
}

export default mygames;
