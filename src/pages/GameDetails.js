import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import cleanupName from '../lib/cleanupName';
import bggTypes from '../lib/bgg-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const gameType = bggTypes.boardgames;

class GameDetails extends Component {

  render() {
    const { mygames, params } = this.props;

    const game = _.find(mygames.games, {objectid: parseInt(params.objectid,10)});

    console.log('game detail', game);

    if (!game){

      return (
        <section>
          <div>game # {params.objectid} not found.  Is your collection loaded?</div>
        </section>
      );
    }

    const yearpublished = (game.yearpublished ? game.yearpublished : '');
    const bggLink = gameType.url + game.objectid;
    //const gameLink = '/details/' + game.objectid;
    const gameDisplayName = cleanupName(game.name.$t);

    game.stats.rating.userrated = game.stats.rating.userrated || {};
    game.stats.rating.average = game.stats.rating.average || {};

    return (
      <div>
        <Header/>
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="mdl-shadow--8dp detail-card">
              <div>
                <h3>{gameDisplayName}</h3>
                <img src={game.image} alt="game"/>
                <div className="mdl-card__supporting-text">
                  <a href={bggLink} target="_blank">{bggLink}</a><br/>
                  Year Published: <span className="gameDetailVal">{yearpublished}</span><br/>
                  My Num Plays: <span className="gameDetailVal">{game.numplays}</span><br/>
                  My Rating: <span className="gameDetailVal">{game.stats.rating.value}</span><br/>
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
        </main>
        <Footer/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { mygames } = state;

  return {
    mygames
  };
}

export default connect(mapStateToProps)(GameDetails);
