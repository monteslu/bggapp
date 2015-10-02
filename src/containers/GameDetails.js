import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';

import cleanupName from '../lib/cleanupName';
import bggTypes from '../constants/bgg-types';


import {
         receiveGames
      } from '../actions/mygames';

const gameType = bggTypes.boardgames;

class GameDetails extends Component {

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

  render() {
    const { mygames, dispatch, params } = this.props;

    const game = _.find(mygames.games, {objectid: parseInt(params.objectid,10)});

    console.log('game detail', game);

    if (!game){

      return (
        <section>
          <div>game # {params.objectid} not found.  Is your collection loaded?</div>
        </section>
      );
    }

    const style = {
      background: 'url(\"' + game.thumbnail + '\") center / cover'
    };

    const yearpublished = (game.yearpublished ? 'published: ' + game.yearpublished : '');
    const bggLink = gameType.url + game.objectid;
    //const gameLink = '/details/' + game.objectid;
    const gameDisplayName = cleanupName(game.name.$t);

    game.stats.rating.userrated = game.stats.rating.userrated || {};
    game.stats.rating.average = game.stats.rating.average || {};

    return (
      <div>

        <div className="mdl-shadow--8dp detail-card">
          <div>
            <h3>{gameDisplayName}</h3>
            <img src={game.thumbnail}/>
            <div className="mdl-card__supporting-text">
              <a href={bggLink} target="_blank">{bggLink}</a><br/>
              Year Published: <span className="gameDetailVal">{game.yearpublished}</span><br/>
              My Rating: <span className="gameDetailVal">{game.stats.rating.userrated.value}</span><br/>
              Avg BGG Rating: <span className="gameDetailVal">{game.stats.rating.average.value}</span><br/>
              Min # Players: <span className="gameDetailVal">{game.stats.minplayers}</span><br/>
              Max # Players: <span className="gameDetailVal">{game.stats.maxplayers}</span><br/>
              Playing Time: <span className="gameDetailVal">{game.stats.playingtime}</span><br/>
              Min Playing Time: <span className="gameDetailVal">{game.stats.minplaytime}</span><br/>
              Max Playing Time: <span className="gameDetailVal">{game.stats.maxplaytime}</span><br/>
            </div>
          </div>
        </div>
      </div>
    );


    return
  }
}

GameDetails.propTypes = {
  dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  const { mygames } = state;

  return {
    mygames
  };
}

export default connect(mapStateToProps)(GameDetails);
