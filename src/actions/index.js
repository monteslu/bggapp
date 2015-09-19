import fetch from 'isomorphic-fetch';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const SELECT_HOTNESS = 'SELECT_HOTNESS';
export const INVALIDATE_HOTNESS = 'INVALIDATE_HOTNESS';

export function selectHotness(hotness) {
  return {
    type: SELECT_HOTNESS,
    hotness
  };
}

export function invalidateHotness(hotness) {
  return {
    type: INVALIDATE_HOTNESS,
    hotness
  };
}

function requestGames(hotness) {
  return {
    type: REQUEST_GAMES,
    hotness
  };
}

function receiveGames(hotness, json) {
  return {
    type: RECEIVE_GAMES,
    hotness: hotness,
    games: json.items.item.map(child => child),
    receivedAt: Date.now()
  };
}

function fetchGames(hotness) {
  return dispatch => {
    dispatch(requestGames(hotness));
    return fetch(`https://monteslu.iceddev.com/bgg/hotness?type=${hotness}`)
      .then(response => response.json())
      .then(json => dispatch(receiveGames(hotness, json)));
  };
}

function shouldFetchGames(state, hotness) {
  const games = state.gamesByHotness[hotness];
  if (!games) {
    return true;
  }
  if (games.isFetching) {
    return false;
  }
  return games.didInvalidate;
}

export function fetchGamesIfNeeded(hotness) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), hotness)) {
      return dispatch(fetchGames(hotness));
    }
  };
}
