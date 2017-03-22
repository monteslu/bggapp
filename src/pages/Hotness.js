import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchGamesIfNeeded } from '../state/hotness';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';

import bggTypes from '../lib/bgg-types';
import {LinearProgress} from 'material-ui';

class Hotness extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGamesIfNeeded());
  }


  render() {
    const { games, isFetching } = this.props;
    const gameType = bggTypes.boardgames;
    console.log('hotness render', games, isFetching);
    let output = (<h2>Empty.</h2>);
    if(isFetching && games.length === 0){
      output = (<LinearProgress mode="indeterminate"  />);
    }
    if(!isFetching && games.length > 0){
      output = (
        <div>
        {games.map(function(game, i) {
          return <GameCard game={game} gameType={gameType} key={i}/>;
        })}
        </div>
      );
    }
    return (
      <div>
        <Header/>
        <main className="mdl-layout__content">
          <div className="page-content">
          <h3>Hotness:</h3>
            {output}
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, games } = state.hotness;

  return {
    games,
    isFetching
  };
}

export default connect(mapStateToProps)(Hotness);
