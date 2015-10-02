import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {DropDownMenu, Slider, Toggle} from 'material-ui';
import {filter} from 'lodash';

import GameCard from '../components/CollectionGameCard';
import UserForm from '../components/UserForm';

import bggTypes from '../constants/bgg-types';


import { updatePickerFilter,
         UPDATE_MIN_RATING,
         UPDATE_MIN_BGG_RATING,
         UPDATE_NUM_PLAYERS,
         UPDATE_MIN_MINUTES,
         UPDATE_MAX_MINUTES,
         UPDATE_WANT_TO_PLAY
      } from '../actions/picker';

import {
         receiveGames
      } from '../actions/mygames';


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

      return true;
    });
}

class PickerSlider extends Component {

  render(){
    const{onChange} = this.props;
    let valDisplay = this.props.value + '/' + this.props.max;
    if(!this.props.value){
      valDisplay = 'Any';
    }

    const sliderStyle = {
      marginTop: '8px',
      marginBottom: '20px'
    };

    return <div><span>{this.props.name}: </span><span className="pickerValue">{valDisplay}</span><Slider style={sliderStyle} defaultValue={5.0} step={this.props.step || 0.10} onChange={(e, val) => onChange(val)} min={this.props.min || 0} max={this.props.max} value={this.props.value}/></div>;
  }

};


class Picker extends Component{

  change(type, val){
    const { dispatch } = this.props;
    dispatch(updatePickerFilter(type, val));
  }

  componentDidMount() {
    const { dispatch, mygames } = this.props;
    if(mygames.games && !mygames.games.length && localStorage.games){
      try{
        dispatch(receiveGames(JSON.parse(localStorage.games)));
      }
      catch(exp){
        console.log('error with localStorage', exp);
      }
    }
  }

  render(){
    const {picker, mygames, dispatch} = this.props;

    let filteredGames = mygames.games || [];

    const showForm = !filteredGames.length;

    const userForm = !filteredGames.length ? (
      <section>
        <UserForm mygames={mygames} dispatch={dispatch}/>
      </section>
    ) : '';

    const pickerControls = filteredGames.length ? (
      <section className="pickerControls">
        <div>
          <div className="pickerRow"><PickerSlider value={this.props.picker.minRating} onChange={val => this.change(UPDATE_MIN_RATING, val)} name="my minimum rating" step={0.25} max={10}/></div>
          <div className="pickerRow"><PickerSlider value={this.props.picker.minBggRating} onChange={val => this.change(UPDATE_MIN_BGG_RATING, val)} name="bgg minimum rating" step={0.25} max={10}/></div>
          <div className="pickerRow"><PickerSlider value={this.props.picker.numPlayers} onChange={val => this.change(UPDATE_NUM_PLAYERS, val)} name="number of players" step={1} max={15}/></div>
          <div className="pickerRow"><PickerSlider value={this.props.picker.minMinutes} onChange={val => this.change(UPDATE_MIN_MINUTES, val)} name="minimum playtime minutes" step={15} max={300}/></div>
          <div className="pickerRow"><PickerSlider value={this.props.picker.maxMinutes} onChange={val => this.change(UPDATE_MAX_MINUTES, val)} name="maximum playtime minutes" step={15} max={600}/></div>
          <div className="pickerRow"><div><span>Want To Play: </span><Toggle onToggle={(evt,val) => this.change(UPDATE_WANT_TO_PLAY, val)} defaultToggled={this.props.picker.wantToPlay} name="wantToPlay"/></div></div>
        </div>
      </section>
    ) : '';

    filteredGames = filterGames(picker, filteredGames);

    return (
    <div>
      {pickerControls}
      {userForm}
      <section>
        {filteredGames.map(function(game, i) {
          return <GameCard game={game} gameType={gameType} key={i}/>;
        })}
      </section>
    </div>
    );
  }
};

Picker.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state){
  const { picker, mygames } = state;

  return {
    picker,
    mygames
  };
}

export default connect(mapStateToProps)(Picker);
