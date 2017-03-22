import {hotness} from '../lib/bgg';

import { promiseHandler } from 'cooldux';

const { getGamesStart, getGamesEnd, getGamesError, getGamesHandler } = promiseHandler('getGames', 'hotness');


function fetchGames() {
  console.log('fetchGames()');
  return dispatch => {
    getGamesHandler(hotness()
      .then(response => response.entity)
      .then(json => json.items.item.map(child => child)),
      dispatch);
  };
}

function shouldFetchGames(state) {
  const { games } = state.hotness;

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

const initialState = {
  isFetching: false,
  games: []
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case getGamesStart.type:
      return {...state, isFetching: true};
    case getGamesEnd.type:
      return {...state, isFetching: false, games: payload };
    case getGamesError.type:
      return {...state, isFetching: true};
    default:
      return state;
  }
}
