import {hotness} from '../lib/bgg';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';


function requestGames() {
  return {
    type: REQUEST_GAMES
  };
}

function receiveGames(json) {
  console.log('receiveGames', json);
  return {
    type: RECEIVE_GAMES,
    games: json.items.item.map(child => child)
  };
}

function fetchGames() {
  console.log('fetchGames()');
  return dispatch => {
    dispatch(requestGames());

    return hotness()
      .then(response => response.entity)
      .then(json => dispatch(receiveGames(json)))
      .catch(err => console.log.bind(console));
  };
}

function shouldFetchGames(state) {
  const games = state.hotness.games;

  if (!games || games.length === 0) {
    return true;
  }
  if (games.isFetching) {
    return false;
  }
  return false;
}

export function fetchGamesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames());
    }
  };
}
