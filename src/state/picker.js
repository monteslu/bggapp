
//ranges
export const UPDATE_NUM_PLAYERS = 'UPDATE_NUM_PLAYERS';
export const UPDATE_MIN_RATING = 'UPDATE_MIN_RATING';
export const UPDATE_MIN_BGG_RATING = 'UPDATE_MIN_BGG_RATING';
export const UPDATE_MIN_MINUTES = 'UPDATE_MIN_MINUTES';
export const UPDATE_MAX_MINUTES = 'UPDATE_MAX_MINUTES';

//toggles
export const UPDATE_WANT_TO_PLAY = 'UPDATE_WANT_TO_PLAY';
export const UPDATE_EXCLUDE_EXPANSIONS = 'UPDATE_EXCLUDE_EXPANSIONS';
export const UPDATE_ONLY_OWNED = 'UPDATE_ONLY_OWNED';

export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';

export function updatePickerFilter(type, payload){
  return {
    type,
    payload
  };
}

let initialState = {
   minRating: 0,
   minBggRating: 5,
   numPlayers: 0,
   wantToPlay: false,
   minMinutes: 0,
   maxMinutes: 0,
   excludeExpansions: true,
   onlyOwned: true,
   sortBy: 'rating'
 };

try{
  initialState = JSON.parse(localStorage.picker);
}
catch(exp){
  //whatevs
}

function pickerState(state = initialState, {type, payload}){
  switch (type) {
  case UPDATE_NUM_PLAYERS:
    return {...state, numPlayers: payload };
  case UPDATE_MIN_RATING:
    return {...state, minRating: payload };
  case UPDATE_MIN_BGG_RATING:
    return {...state, minBggRating: payload };
  case UPDATE_WANT_TO_PLAY:
    return {...state, wantToPlay: payload };
  case UPDATE_MIN_MINUTES:
    return {...state, minMinutes: payload };
  case UPDATE_MAX_MINUTES:
    return {...state, maxMinutes: payload };
  case UPDATE_EXCLUDE_EXPANSIONS:
    return {...state, excludeExpansions: payload };
  case UPDATE_ONLY_OWNED:
    return {...state, onlyOwned: payload };
  case UPDATE_SORT_BY:
    return {...state, sortBy: payload };
  default:
    return state;
  }
}

export default pickerState;
