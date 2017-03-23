import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchGamesIfNeeded } from '../state/hotness';
import Layout from './Layout';
import GameCard from '../components/GameCard';

import bggTypes from '../lib/bgg-types';
import {LinearProgress} from 'material-ui';

class Hotness extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGamesIfNeeded());
  }


  render() {

    const { games, gamesPending } = this.props;
    const gameType = bggTypes.boardgames;
    console.log('hotness render', games, gamesPending);
    let output = (<h2>Empty.</h2>);
    if(gamesPending && !games){
      output = (<LinearProgress mode="indeterminate"  />);
    }
    if(!gamesPending && games){
      output = (
        <div>
        {games.map(function(game, i) {
          return <GameCard game={game} gameType={gameType} key={i}/>;
        })}
        </div>
      );
    }
    return (
      <Layout>
        <h3>Hotness:</h3>
        {output}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { gamesPending, games } = state.hotness;

  return {
    games,
    gamesPending
  };
}

export default connect(mapStateToProps)(Hotness);
