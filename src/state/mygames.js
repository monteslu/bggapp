import {collection} from '../lib/bgg';

import { promiseHandler, makeActionCreator } from 'cooldux';

const { getGamesStart, getGamesEnd, getGamesError } = promiseHandler('getGames', 'mygames');

const collectionQueued = makeActionCreator('COLLECTION_QUEUED');
export const updateUsername = makeActionCreator('UPDATE_USERNAME');

function fetchGames(username) {
  console.log('fetchGames()');
  localStorage.username = username;
  return dispatch => {
    dispatch(getGamesStart());

    return collection(username)
      .then(games => {
        console.log('my games fetched', games);

        if(games.message){
          return dispatch(collectionQueued());
        }
        localStorage.games = JSON.stringify(games);
        return dispatch(getGamesEnd(games));
      })
      .catch(err => {
        console.log('error fetching games', err);
        dispatch(getGamesError(err));
      });
  };
}

export function loadMyGames() {
  return (dispatch, getState) => {
    const { mygames } = getState();
    return dispatch(fetchGames(mygames.username));
  };
}

let games;
if(localStorage.games){
  try{
    games = JSON.parse(localStorage.games);
  }
  catch(exp){}
}

const initialState = {
  username: localStorage.username || null,
  isFetching: false,
  isQueued: false,
  errorFetching: null,
  games: games || []
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case getGamesStart.type:
      return {...state, isFetching: true, isQueued: false, errorFetching: null };
    case getGamesEnd.type:
      return {...state, isFetching: false, games: payload, isQueued: false, errorFetching: null };
    case updateUsername.type:
      return {...state, username: payload };
    case collectionQueued.type:
      return {...state, isFetching: false, isQueued: true, errorFetching: null };
    case getGamesError.type:
      return {...state, isFetching: false, isQueued: false, errorFetching: payload };
    default:
      return state;
  }
};
