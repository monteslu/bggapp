import { promiseHandler } from 'cooldux';
import {hotness} from '../lib/bgg';

const { gamesHandler, gamesReducer } = promiseHandler('games', 'hotness');

function fetchGames() {
  console.log('fetchGames()');
  return dispatch => {
    gamesHandler(hotness()
      .then(response => response.entity)
      .then(json => json.items.item.map(child => child)),
      dispatch);
  };
}

export function fetchGamesIfNeeded() {
  return (dispatch, getState) => {
    const { hotness } = getState();
    if(!hotness.gamesRunning && !hotness.games){
      return dispatch(fetchGames());
    }
  };
}

export default gamesReducer;
