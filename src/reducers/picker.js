import {
  UPDATE_MIN_RATING,
  UPDATE_MIN_BGG_RATING,
  UPDATE_NUM_PLAYERS,
  UPDATE_MIN_MINUTES,
  UPDATE_MAX_MINUTES,
  UPDATE_WANT_TO_PLAY,
  UPDATE_EXCLUDE_EXPANSIONS,
  UPDATE_ONLY_OWNED
} from '../actions/picker';


function pickerState(state = {
   minRating: 0,
   minBggRating: 5,
   numPlayers: 0,
   wantToPlay: false,
   minMinutes: 0,
   maxMinutes: 0,
   excludeExpansions: false,
   onlyOwned: true
 }, action){
  switch (action.type) {
  case UPDATE_NUM_PLAYERS:
    return Object.assign({}, state, {
      numPlayers: action.value
    });
  case UPDATE_MIN_RATING:
    return Object.assign({}, state, {
      minRating: action.value
    });
  case UPDATE_MIN_BGG_RATING:
    return Object.assign({}, state, {
      minBggRating: action.value
    });
  case UPDATE_WANT_TO_PLAY:
    return Object.assign({}, state, {
      wantToPlay: action.value
    });
  case UPDATE_MIN_MINUTES:
    return Object.assign({}, state, {
      minMinutes: action.value
    });
  case UPDATE_MAX_MINUTES:
    return Object.assign({}, state, {
      maxMinutes: action.value
    });
  case UPDATE_EXCLUDE_EXPANSIONS:
    return Object.assign({}, state, {
      excludeExpansions: action.value
    });
  case UPDATE_ONLY_OWNED:
    return Object.assign({}, state, {
      onlyOwned: action.value
    });
  default:
    return state;
  }
}

export default pickerState;
