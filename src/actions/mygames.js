import {collection} from '../lib/bgg';

export const REQUEST_MY_GAMES = 'REQUEST_MY_GAMES';
export const RECEIVE_MY_GAMES = 'RECEIVE_MY_GAMES';
export const COLLECTION_QUEUED = 'COLLECTION_QUEUED';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const ERROR_FETCHING = 'ERROR_FETCHING';


function requestGames() {
  return {
    type: REQUEST_MY_GAMES
  };
}

function collectionQueued() {
  return {
    type: COLLECTION_QUEUED
  };
}

export function updateUsername(username) {
  console.log('updateUsername action', username);
  return {
    type: UPDATE_USERNAME,
    username
  };
}

export function receiveGames(games) {
  return {
    type: RECEIVE_MY_GAMES,
    games
  };
}

function errorFetching(error){
  return {
    type: ERROR_FETCHING,
    error
  };
}



function fetchGames(username) {
  console.log('fetchGames()');
  localStorage.username = username;
  return dispatch => {
    dispatch(requestGames());

    return collection(username)
      .then(response => response.entity)
      .then(json => {

        console.log('my games fetched', json);

        if(json.message){
          return dispatch(collectionQueued());
        }
        let games = json.items.item;
        localStorage.games = JSON.stringify(games);
        return dispatch(receiveGames(games));
      })
      .catch(err => {
        console.log('error fetching games', err);
        dispatch(errorFetching(err));
      });
  };
}


export function loadMyGames() {
  return (dispatch, getState) => {
    const state = getState();

    return dispatch(fetchGames(state.mygames.username));
  };
}
