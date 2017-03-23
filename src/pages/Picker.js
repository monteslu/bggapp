import React, { Component } from 'react';
import { connect } from 'react-redux';

import {filter} from 'lodash';

import Layout from './Layout';

import GameCard from '../components/CollectionGameCard';
import UserForm from '../components/UserForm';
import PickerControls from '../components/PickerControls';

import bggTypes from '../lib/bgg-types';

const gameType = bggTypes.boardgames;


function filterGames(picker, games){
  return filter(games, game =>{
      if(picker.minRating && (!parseFloat(game.stats.rating.value, 10) || game.stats.rating.value <=picker.minRating)){
        return false;
      }

      if(picker.minBggRating && game.stats.rating.average &&  game.stats.rating.average.value < picker.minBggRating){
        return false;
      }

      if(picker.numPlayers && (game.stats.minplayers > picker.numPlayers || game.stats.maxplayers < picker.numPlayers)){
        return false;
      }

      if(picker.minMinutes && (!parseFloat(game.stats.playingtime, 10) || game.stats.playingtime < picker.minMinutes)){
        return false;
      }

      if(picker.maxMinutes && (!parseFloat(game.stats.playingtime, 10) || game.stats.playingtime > picker.maxMinutes)){
        return false;
      }

      if(picker.wantToPlay && !game.status.wanttoplay){
        return false;
      }

      if(picker.excludeExpansions && game.subtype === 'boardgameexpansion'){
        return false;
      }

      if(picker.onlyOwned && !game.status.own){
        return false;
      }

      return true;
    });
}

function sort(games, sortBy){
  return games.sort((a,b) => {
    if(sortBy === 'bggrating'){
      if(a.stats.rating.average.value === b.stats.rating.average.value){
        return 0;
      }
      return a.stats.rating.average.value < b.stats.rating.average.value ? 1 : -1;
    }
    else if(sortBy === 'playingtime'){
      if(a.stats.playingtime === b.stats.playingtime){
        return 0;
      }
      return a.stats.playingtime < b.stats.playingtime ? 1 : -1;
    }
    else if(sortBy === 'numplays'){
      if(a.numplays === b.numplays){
        return 0;
      }
      return a.numplays < b.numplays ? 1 : -1;
    }
    else{
      a.stats.rating.value = a.stats.rating.value || 0;
      b.stats.rating.value = b.stats.rating.value || 0;
      if(a.stats.rating.value === b.stats.rating.value){
        return 0;
      }
      return a.stats.rating.value < b.stats.rating.value ? 1 : -1;
    }
  });
}


class Picker extends Component{


  componentDidMount() {
    // const { mygames } = this.props;
    console.log('picker componentDidMount', this.props);
    // if(mygames.games && !mygames.games.length && localStorage.games){
    //   try{
    //     this.props.getGamesEnd(JSON.parse(localStorage.games)));
    //   }
    //   catch(exp){
    //     console.log('error with localStorage', exp);
    //   }
    // }
  }

  render(){
    const {picker, mygames, dispatch} = this.props;

    let filteredGames = mygames.games || [];

    console.log('filteredGames', filteredGames);

    // const showForm = !filteredGames.length;

    const userForm = !filteredGames.length ? (
      <section>
        <UserForm mygames={mygames} dispatch={dispatch}/>
      </section>
    ) : '';

    const pickerControls = filteredGames.length ? (
      <PickerControls dispatch={dispatch} picker={picker}/>
    ) : '';

    filteredGames = filterGames(picker, filteredGames);
    console.log('filteredGames.length', filteredGames.length);
    filteredGames = sort(filteredGames, picker.sortBy);

    return (
    <Layout>
      {pickerControls}
      {userForm}
      <section>
        {filteredGames.map(function(game, i) {
          return <GameCard game={game} gameType={gameType} key={i}/>;
        })}
      </section>
    </Layout>
    );
  }
};



function mapStateToProps(state){
  const { picker, mygames } = state;

  console.log('state from picker', state);

  return {
    picker,
    mygames
  };
}

export default connect(mapStateToProps)(Picker);
