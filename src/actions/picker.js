export const UPDATE_NUM_PLAYERS = 'UPDATE_NUM_PLAYERS';
export const UPDATE_MIN_RATING = 'UPDATE_MIN_RATING';
export const UPDATE_MIN_BGG_RATING = 'UPDATE_MIN_BGG_RATING';
export const UPDATE_WANT_TO_PLAY = 'UPDATE_WANT_TO_PLAY';
export const UPDATE_MIN_MINUTES = 'UPDATE_MIN_MINUTES';
export const UPDATE_MAX_MINUTES = 'UPDATE_MAX_MINUTES';

export function updatePickerFilter(type, value){
  return {
    type,
    value
  };
}
