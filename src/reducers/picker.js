import {
  UPDATE_MIN_RATING,
  UPDATE_MIN_BGG_RATING,
  UPDATE_NUM_PLAYERS,
  UPDATE_WANT_TO_PLAY,
  UPDATE_MIN_MINUTES,
  UPDATE_MAX_MINUTES
} from '../actions/picker';


function pickerState(state = {
   minRating: 0,
   minBggRating: 5,
   numPlayers: 0,
   wantToPlay: false,
   minMinutes: 0,
   maxMinutes: 0
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
  default:
    return state;
  }
}

export default pickerState;
